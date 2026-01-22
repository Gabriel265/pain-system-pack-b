/*
this route gets the changed files and prompts done, to dispay to the user in detail.
*/
import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function GET(request, context) {
  try {
    
    const params = await context.params;
    const pull_number = Number(params.id);

    const octokit = await getOctokit();

    const { data: pr } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
    });

    const { data: files } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number,
    });

    const run = {
      id: pr.number.toString(),
      summary: pr.title.replace(/^AI Proposal: /, ''),
      prompt: pr.body?.match(/\*\*Prompt:\*\* (.+)/)?.[1] || 'Unknown',
      status: pr.state === 'open' ? 'Pending' : pr.merged_at ? 'Merged' : 'Closed',
      created_at: pr.created_at,
      previewUrl: `https://ai-lab-${process.env.GITHUB_REPO}.vercel.app`,
      files: files.map(f => ({
        path: f.filename,
        status: f.status,
        diff: f.patch || '(No diff – new file or binary)',
      })),
    };

    return NextResponse.json(run);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load proposal: ' + e.message }, { status: 500 });
  }
}