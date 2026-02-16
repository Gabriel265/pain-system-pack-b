import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { packages } = await req.json();

    if (!packages || !Array.isArray(packages) || packages.length === 0) {
      return NextResponse.json({ error: "No packages provided" }, { status: 400 });
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    console.log("[approve] Starting direct commit for packages:", packages);

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = "ai-lab";
    const baseBranch = "ai-deploy";

    // ────────────────────────────────────────────────
    // Ensure ai-lab branch exists (reset from ai-deploy if missing or wrong)
    // ────────────────────────────────────────────────
    let baseSha;
    try {
      const { data: baseRef } = await octokit.request(
        "GET /repos/{owner}/{repo}/git/refs/heads/{baseBranch}",
        { owner, repo, baseBranch }
      );
      baseSha = baseRef.object.sha;
      console.log(`[approve] Found base branch ${baseBranch} at SHA ${baseSha}`);
    } catch (err) {
      console.error("[approve] Failed to get base branch:", err.message);
      throw new Error("Cannot find base branch ai-deploy");
    }

    try {
      // Try to update existing ai-lab branch
      await octokit.request(
        "PATCH /repos/{owner}/{repo}/git/refs/heads/{branch}",
        {
          owner,
          repo,
          branch,
          sha: baseSha,
          force: true,
        }
      );
      console.log(`[approve] Reset existing ${branch} branch to ${baseBranch}`);
    } catch (err) {
      if (err.status === 404 || err.status === 422) {
        // Branch doesn't exist → create it
        await octokit.request(
          "POST /repos/{owner}/{repo}/git/refs",
          {
            owner,
            repo,
            ref: `refs/heads/${branch}`,
            sha: baseSha,
          }
        );
        console.log(`[approve] Created new ${branch} branch from ${baseBranch}`);
      } else {
        console.error("[approve] Failed to reset/create branch:", err.message);
        throw err;
      }
    }

    // Now branch exists — proceed with commits
    // Helper: Update or create a file on the branch
    const updateOrCreateFile = async (path, updateContentFn, commitMessage) => {
      let currentContent = "{}";
      let sha = null;

      try {
        const { data: file } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          { owner, repo, path, ref: branch }
        );
        currentContent = Buffer.from(file.content, "base64").toString("utf-8");
        sha = file.sha;
        console.log(`[approve] Found existing ${path} (sha: ${sha})`);
      } catch (err) {
        if (err.status === 404) {
          console.log(`[approve] ${path} does not exist on ${branch} — will create it`);
        } else {
          throw err;
        }
      }

      const updatedContent = updateContentFn(currentContent);

      await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path,
          message: commitMessage,
          content: Buffer.from(updatedContent).toString("base64"),
          ...(sha && { sha }),
          branch,
        }
      );

      console.log(`[approve] ${sha ? "Updated" : "Created"} ${path} on ${branch}`);
    };

    // 1. Update package.json
    await updateOrCreateFile(
      "package.json",
      (content) => {
        let pkg;
        try {
          pkg = JSON.parse(content);
        } catch {
          pkg = { dependencies: {}, devDependencies: {} };
        }
        if (!pkg.dependencies) pkg.dependencies = {};
        if (!pkg.devDependencies) pkg.devDependencies = {};

        packages.forEach((p) => {
          if (p.type === "dependencies") {
            pkg.dependencies[p.name] = p.version;
          } else if (p.type === "devDependencies") {
            pkg.devDependencies[p.name] = p.version;
          } else {
            pkg.dependencies[p.name] = p.version; // fallback
          }
        });

        return JSON.stringify(pkg, null, 2) + "\n";
      },
      "AI-Lab: add approved dependencies to package.json"
    );

    // 2. Update or create allowlist
    await updateOrCreateFile(
      ".github/allowed-dependencies.json",
      (content) => {
        let data;
        try {
          data = JSON.parse(content);
        } catch {
          data = { allowed: [] };
        }
        const allowedSet = new Set(data.allowed || []);
        packages.forEach((p) => allowedSet.add(p.name));
        data.allowed = Array.from(allowedSet).sort();
        return JSON.stringify(data, null, 2) + "\n";
      },
      "AI-Lab: add approved packages to allowlist"
    );

    // 3. Create or update PR
    const prTitle = `AI-Lab: Approved dependency installation (${packages.map(p => p.name).join(", ")})`;
    const prBody = `**Approved packages:**\n${packages.map(p => `- ${p.name}@${p.version} (${p.type})`).join("\n")}\n\nAuto-generated by AI Lab approval flow.\n\n**Preview:** https://${process.env.VERCEL_PROJECT_SLUG || repo}-git-ai-lab.vercel.app`;

    let prNumber;
    try {
      const { data: existing } = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls",
        { owner, repo, head: `${owner}:${branch}`, base: "ai-deploy", state: "open" }
      );

      if (existing.length > 0) {
        await octokit.request(
          "PATCH /repos/{owner}/{repo}/pulls/{pull_number}",
          {
            owner,
            repo,
            pull_number: existing[0].number,
            title: prTitle,
            body: prBody,
          }
        );
        prNumber = existing[0].number;
        console.log(`[approve] Updated existing PR #${prNumber}`);
      } else {
        const { data: pr } = await octokit.request(
          "POST /repos/{owner}/{repo}/pulls",
          {
            owner,
            repo,
            title: prTitle,
            body: prBody,
            head: branch,
            base: "ai-deploy",
          }
        );
        prNumber = pr.number;
        console.log(`[approve] Created new PR #${prNumber}`);
      }
    } catch (prErr) {
      console.error("[approve] Failed to handle PR:", prErr.message);
    }

    console.log("[approve] All commits complete — branch ready");

    return NextResponse.json({
      success: true,
      message: "Dependencies approved and committed. Branch created/reset. PR ready. Vercel should deploy shortly. Refresh prompts in ~30s.",
      prNumber,
    });
  } catch (error) {
    console.error("[approve] Error:", error.message);
    if (error.response) {
      console.error("GitHub response:", error.response.status, error.response.data);
    }
    return NextResponse.json({ error: error.message || "Approval & commit failed" }, { status: 500 });
  }
}