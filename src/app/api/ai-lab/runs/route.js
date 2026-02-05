/*
 * API route for fetching a paginated list of AI runs (GitHub PRs).
 * GET /api/ai-lab/runs?page=X&limit=Y
 * Returns only AI proposals on the ai-lab → ai-deploy flow.
 * Compatible with dashboard's infinite scroll / pagination.
 *   - Uses GitHub's pagination (page/per_page)
 *   - Filters strictly to PRs from ai-lab branch
 *   - Sorts newest first (GitHub default for pulls list)
 *   - Does NOT include full prompt in list (saves bandwidth; fetched in detail view)
 */

import { NextResponse } from "next/server";
import { getOctokit, getBuildStatuses  } from "../_shared";

export async function GET(request) {
  try {
    // Parse pagination from query string (dashboard sends these)
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const octokit = await getOctokit();

    // Fetch PRs with proper pagination
    const { data: pulls } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls",
      {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        base: "ai-deploy",
        head: `${process.env.GITHUB_OWNER}:ai-lab`, // Strict filter: only ai-lab branch PRs
        state: "all", // include merged/closed for history
        per_page: limit,
        page, // ← key fix
        direction: "desc", // newest first (optional but explicit)
      },
    );

    // Map to minimal run objects (what dashboard actually needs)
    const runs = await Promise.all(
  pulls.map(async (p) => {
    let buildStatuses = {
      githubCI: { status: 'unknown', conclusion: 'neutral' },
      vercelDeploy: { status: 'unknown' }
    };

    try {
      buildStatuses = await getBuildStatuses(p.number) || buildStatuses;
    } catch (err) {
      console.error(`Status fetch failed for PR #${p.number}:`, err);
    }

    return {
      id: p.number.toString(),
      summary: p.title.replace(/^AI Proposal: /, "") || p.title,
      status: p.state === "open" ? "Pending" : p.merged_at ? "Merged" : "Closed",
      created_at: p.created_at,
      buildStatuses,
    };
  })
);

  return NextResponse.json(runs);
} catch (e) {
    return NextResponse.json(
      { error: "Failed to list proposals: " + (e.message || "Unknown error") },
      { status: 500 },
    );
  }
}
