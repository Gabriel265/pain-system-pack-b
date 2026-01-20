import { NextResponse } from 'next/server';
import { getOctokit } from '../_shared';

export async function GET() {
  try {
    const octokit = await getOctokit();

    const { data: pulls } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      base: 'ai-deploy',
      head: `${process.env.GITHUB_OWNER}:ai-agent`,
      state: 'all',
      per_page: 30,
    });

    const runs = pulls.map(p => ({
      id: p.number.toString(),
      summary: p.title.replace(/^AI Proposal: /, ''),
      status: p.state === 'open' ? 'Pending' : p.merged_at ? 'Merged' : 'Closed',
      created_at: p.created_at,
      prompt: p.body?.match(/\*\*Prompt:\*\* (.+)/)?.[1] || 'Unknown',
    }));

    return NextResponse.json(runs);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to list proposals' }, { status: 500 });
  }
}