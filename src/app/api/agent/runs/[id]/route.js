import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function GET(req, { params }) {
  try {
    const octokit = await getOctokit();
    const pull_number = Number(params.id);

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
      previewUrl: `https://ai-agent-${process.env.GITHUB_REPO}.vercel.app`,
      files: files.map(f => ({
        path: f.filename,
        status: f.status,
        diff: f.patch || '(No diff – new file or binary)',
      })),
    };

    return NextResponse.json(run);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load proposal' }, { status: 500 });
  }
}