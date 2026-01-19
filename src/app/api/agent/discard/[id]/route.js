import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function POST(req, { params }) {
  try {
    const octokit = await getOctokit();
    const pull_number = Number(params.id);

    await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
      state: 'closed',
    });

    await octokit.request('DELETE /repos/{owner}/{repo}/git/refs/heads/ai-agent', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}