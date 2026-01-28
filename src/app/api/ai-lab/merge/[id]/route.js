import { NextResponse } from 'next/server';
import { getOctokit } from '../../_shared';

export async function POST(request, context) {
  try {
    const params = await context.params;
    const pull_number = Number(params.id);

    const octokit = await getOctokit();

    // Check runtime state for verification
    const runtimeRes = await fetch('/api/ai-lab/runtime');
    const runtimeState = await runtimeRes.json();

    if (!runtimeState.verified) {
      return NextResponse.json({ error: 'Execution not verified, merge blocked' }, { status: 403 });
    }

    // Merge the PR
    await octokit.request(
      'PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge',
      {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        pull_number,
        merge_method: 'merge',
        commit_title: 'AI changes approved',
        commit_message: 'Merged via AI Lab review interface',
      },
    );

    await octokit
      .request('DELETE /repos/{owner}/{repo}/git/refs/heads/ai-lab', {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
      })
      .catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'PR merged successfully',
    });
  } catch (e) {
    return NextResponse.json(
      { error: e.message || 'Failed to merge' },
      { status: 500 },
    );
  }
}
