/*
This route is used to get the folder structure from GitHub and display it on the AI Lab
dashboard (ai-deploy branch) and the detail page (ai-lab branch)
*/
import { NextResponse } from "next/server";
import { getOctokit } from "../_shared";

export async function GET(request) {
  try {
    const octokit = await getOctokit();

    // Use query param for branch, default to ai-deploy
    const branch = request.nextUrl.searchParams.get("branch") || "ai-deploy";

    console.log(`[repo-tree] Fetching tree for branch: ${branch}`);

    // Correct endpoint: use branch name directly as ref
    const { data: tree } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/{ref}?recursive=1",
      {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        ref: branch, // ← branch name (ai-lab or ai-deploy)
      }
    );

    const files = tree.tree
      .filter((t) => t.type === "blob")
      .map((t) => ({ path: t.path }));

    return NextResponse.json(files);
  } catch (e) {
    console.error("[repo-tree] Error:", e.message);
    if (e.status === 404 || e.status === 422) {
      // Branch might be resetting or empty — return empty tree instead of 500
      console.log("[repo-tree] Branch not ready yet — returning empty tree");
      return NextResponse.json([]);
    }
    return NextResponse.json(
      { error: "Failed to fetch tree: " + e.message },
      { status: 500 }
    );
  }
}