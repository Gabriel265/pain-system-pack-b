/*
 * API route for fetching a single run detail (GitHub PR by ID).
 * Handles GET /api/ai-lab/runs/[id].
 * Returns run object with summary, prompt, files/diffs, and aiResponse (parsed from PR body).
 * Developer note:
 *   - In Next.js 15+, params is a Promise → must await it.
 *   - Uses regex to extract sections from PR body—no extra parsers.
 *   - Added 404 handling for missing PRs.
 */

import { NextResponse } from "next/server";
import { getOctokit, getBuildStatuses  } from "../../_shared"; // Adjust path if needed (was '../_shared' earlier)

export async function GET(request, context) {
  // context contains { params }
  try {
    // Await params (required in Next.js 15+)
    const params = await context.params;
    const pull_number = Number(params.id); // Now safe

    if (!pull_number || isNaN(pull_number)) {
      return NextResponse.json(
        { error: "Invalid pull request ID" },
        { status: 400 },
      );
    }

    const octokit = await getOctokit();

    // Fetch the PR
    const { data: pr } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        pull_number,
      },
    );

    // Fetch changed files
    const { data: files } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
      {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        pull_number,
      },
    );

    // Generate preview URL
    const projectSlug = (
      process.env.VERCEL_PROJECT_SLUG ||
      process.env.GITHUB_REPO ||
      "unknown-project"
    )
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const teamSlug = process.env.VERCEL_TEAM_SLUG
      ? `-${process.env.VERCEL_TEAM_SLUG}`
      : "";

    // Parse PR body for prompt and AI response
    const promptMatch = pr.body?.match(/\*\*Prompt:\*\* (.+)/);
    const aiResponseMatch = pr.body?.match(
      /\*\*AI Response:\*\*\n```json\n([\s\S]*?)\n```/,
    );

      const buildStatuses = await getBuildStatuses(pr.number);
    const run = {
      id: pr.number.toString(),
      summary: pr.title.replace(/^AI Proposal: /, "") || pr.title, // Fallback if no prefix
      prompt: promptMatch ? promptMatch[1].trim() : "Unknown",
      status:
        pr.state === "open" ? "Pending" : pr.merged_at ? "Merged" : "Closed",
      created_at: pr.created_at,
      previewUrl: `https://${projectSlug}-git-ai-lab${teamSlug}.vercel.app`,
      files: files.map((f) => ({
        path: f.filename,
        status: f.status,
        diff: f.patch || "(No diff – new file or binary)",
      })),
      aiResponse: aiResponseMatch
        ? aiResponseMatch[1].trim()
        : "No AI response available",
        buildStatuses,
    };

    return NextResponse.json(run);
  } catch (e) {
    // Handle GitHub 404 specifically (common when PR doesn't exist)
    if (e.status === 404) {
      return NextResponse.json(
        { error: "Pull request not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to load proposal: " + (e.message || "Unknown error") },
      { status: 500 },
    );
  }
}
