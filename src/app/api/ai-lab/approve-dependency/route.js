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

    // Helper to update a file
    const updateFile = async (path, updateContentFn, commitMessage) => {
      try {
        // Get current file
        const { data: file } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          { owner, repo, path, ref: branch }
        );

        const currentContent = Buffer.from(file.content, "base64").toString("utf-8");
        const updatedContent = updateContentFn(currentContent);

        // Commit update
        await octokit.request(
          "PUT /repos/{owner}/{repo}/contents/{path}",
          {
            owner,
            repo,
            path,
            message: commitMessage,
            content: Buffer.from(updatedContent).toString("base64"),
            sha: file.sha,
            branch,
          }
        );

        console.log(`[approve] Updated ${path}`);
      } catch (err) {
        console.error(`[approve] Failed to update ${path}:`, err.message);
        throw err;
      }
    };

    // 1. Update package.json (add to dependencies)
    await updateFile(
      "package.json",
      (content) => {
        const pkg = JSON.parse(content);
        if (!pkg.dependencies) pkg.dependencies = {};
        packages.forEach((p) => {
          pkg.dependencies[p.name] = p.version;
        });
        return JSON.stringify(pkg, null, 2) + "\n"; // ensure trailing newline
      },
      "AI-Lab: add approved dependencies to package.json"
    );

    // 2. Update .github/allowed-dependencies.json
    await updateFile(
      ".github/allowed-dependencies.json",
      (content) => {
        const data = JSON.parse(content);
        const allowedSet = new Set(data.allowed);
        packages.forEach((p) => allowedSet.add(p.name));
        data.allowed = Array.from(allowedSet).sort();
        return JSON.stringify(data, null, 2) + "\n";
      },
      "AI-Lab: add approved packages to allowlist"
    );

    // 3. package-lock.json — we can't reliably generate it here.
    //    Instead: commit an empty change or note that next CI/npm ci will regenerate it.
    //    Simplest: just commit a dummy update if needed, or skip and let CI handle.
    //    For now, skip — next push will trigger CI which runs npm ci anyway.

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