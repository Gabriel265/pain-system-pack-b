import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function POST(req, { params }) {
  try {
    const octokit = await getOctokit();
    const pull_number = Number(params.id);

    await octokit.request('PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
      merge_method: 'merge',
      commit_title: 'AI changes approved',
      commit_message: 'Merged via AI Lab review interface',
    });

    // Optional: clean up branch
    await octokit.request('DELETE /repos/{owner}/{repo}/git/refs/heads/ai-agent', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
    }).catch(() => {}); // ignore if already gone

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}