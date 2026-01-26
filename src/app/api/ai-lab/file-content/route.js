/*
This file gets content from the main development repo which is 'ai-deploy'
This content is used to display on the code preview in the AI lab dashboard
*/

import { NextResponse } from 'next/server';
import { getOctokit } from '../_shared';

import { Buffer } from 'node:buffer'; 

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
      ref: 'ai-deploy', 
    });

  
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return NextResponse.json({ content });
  } catch (error) {

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