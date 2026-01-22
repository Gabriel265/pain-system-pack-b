/*
This route is used to get thee folder structure from github and display it on the AI Lab
dashboard (ai-deploy branch) and the detail page (ai-lab branch)
*/
import { NextResponse } from 'next/server';
import { getOctokit } from '../_shared';

export async function GET(request) {
  try {
    const octokit = await getOctokit();
    const branch = request.nextUrl.searchParams.get('branch') || 'ai-deploy';

    const { data: tree } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      tree_sha: branch,
    });

    const files = tree.tree
      .filter(t => t.type === 'blob')
      .map(t => ({ path: t.path }));

    return NextResponse.json(files);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch tree' }, { status: 500 });
  }
}