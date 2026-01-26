/*
This route is used to discard the changes made by the AI agent on the ai-lab branch
*/

import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function POST(request, context) {
  try {
    const params = await context.params;
    const pull_number = Number(params.id); 

    const octokit = await getOctokit();

    // Close the PR
    await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
      state: 'closed',
    });

    // Delete the ai-lab branch (safe if already gone)
    await octokit.request('DELETE /repos/{owner}/{repo}/git/refs/heads/ai-lab', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
    }).catch(() => {}); // ignore errors like branch not found

    return NextResponse.json({ success: true, message: 'PR closed and branch deleted' });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to discard' }, { status: 500 });
  }
}