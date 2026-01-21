// app/api/agent/file-content/route.js

import { NextResponse } from 'next/server';
import { getOctokit } from '../_shared';

// ← Add this line
import { Buffer } from 'node:buffer';   // or just 'buffer' — both work

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    const octokit = await getOctokit();

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
      ref: 'ai-deploy',  // or 'main' — whatever your stable branch is
    });

    // Now safe with Turbopack + works everywhere
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching file content:', error);

    if (error.status === 404) {
      return NextResponse.json(
        { error: `File not found: ${request.nextUrl.searchParams.get('path')}` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch file content' },
      { status: 500 }
    );
  }
}