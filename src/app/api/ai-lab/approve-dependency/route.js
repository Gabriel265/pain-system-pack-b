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

    // Helper: Update or create a file
    const updateOrCreateFile = async (path, updateContentFn, commitMessage) => {
      let currentContent = "{}"; // default for new file
      let sha = null;

      try {
        // Try to get existing file
        const { data: file } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          { owner, repo, path, ref: branch }
        );

        currentContent = Buffer.from(file.content, "base64").toString("utf-8");
        sha = file.sha;
        console.log(`[approve] Found existing ${path}, sha: ${sha}`);
      } catch (err) {
        if (err.status === 404) {
          console.log(`[approve] ${path} does not exist yet — will create it`);
        } else {
          console.error(`[approve] Failed to get ${path}:`, err.message);
          throw err;
        }
      }

      // Apply updates
      const updatedContent = updateContentFn(currentContent);

      // Commit (create or update)
      await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path,
          message: commitMessage,
          content: Buffer.from(updatedContent).toString("base64"),
          sha, // only include if file existed (omit for create)
          branch,
        }
      );

      console.log(`[approve] ${sha ? "Updated" : "Created"} ${path}`);
    };

    // 1. Update package.json
    await updateOrCreateFile(
      "package.json",
      (content) => {
        let pkg;
        try {
          pkg = JSON.parse(content);
        } catch {
          pkg = { dependencies: {} }; // fallback if invalid
        }
        if (!pkg.dependencies) pkg.dependencies = {};
        packages.forEach((p) => {
          pkg.dependencies[p.name] = p.version;
        });
        return JSON.stringify(pkg, null, 2) + "\n";
      },
      "AI-Lab: add approved dependencies to package.json"
    );

    // 2. Update or create .github/allowed-dependencies.json
    await updateOrCreateFile(
      ".github/allowed-dependencies.json",
      (content) => {
        let data;
        try {
          data = JSON.parse(content);
        } catch {
          data = { allowed: [] }; // initialize if new or invalid
        }
        const allowedSet = new Set(data.allowed || []);
        packages.forEach((p) => allowedSet.add(p.name));
        data.allowed = Array.from(allowedSet).sort();
        return JSON.stringify(data, null, 2) + "\n";
      },
      "AI-Lab: add approved packages to allowlist"
    );

    // 3. package-lock.json: skipped (CI/npm ci will regenerate it on next push/build)

    console.log("[approve] Direct commits complete — changes pushed to ai-lab");

    return NextResponse.json({
      success: true,
      message: "Dependencies approved and committed. Changes pushed — CI will update lockfile. Retry in ~30s.",
    });
  } catch (error) {
    console.error("[approve] Direct commit error:", error.message);
    if (error.response) {
      console.error("GitHub response:", error.response.status, error.response.data);
    }
    return NextResponse.json({ error: error.message || "Approval & commit failed" }, { status: 500 });
  }
}