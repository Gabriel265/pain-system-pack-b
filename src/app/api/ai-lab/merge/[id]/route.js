/*
This rote merges the AI agent changes on ai-lab branch with the production. Only after the user clicks the merge button on the 
prompts detail page.
*/

import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';  

export async function POST(request, context) {
  try {
    const params = await context.params;
    const pull_number = Number(params.id);

    console.log('Merging PR #', pull_number); 

    const octokit = await getOctokit();

    // Merge the PR
    await octokit.request('PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
      merge_method: 'merge',
      commit_title: 'AI changes approved',
      commit_message: 'Merged via AI Lab review interface',
    });

    // Optional: clean up ai-lab branch after successful merge
    await octokit.request('DELETE /repos/{owner}/{repo}/git/refs/heads/ai-lab', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'PR merged successfully' });
  } catch (e) {
    console.error('Merge error:', e);
    return NextResponse.json({ error: e.message || 'Failed to merge' }, { status: 500 });
  }
}