/*
 * Shared utilities for GitHub API interactions.
 * This file centralizes Octokit authentication to avoid duplication across routes.
 * Used by run/route.js, runs/route.js, and runs/[id]/route.js.
 */
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';

export async function getOctokit() {
  // Authenticate using GitHub App credentials from env vars.
  // This uses installation auth for repo access—keeps it secure and token-limited.
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  const installationAuth = await auth({
    type: 'installation',
    installationId: Number(process.env.GITHUB_INSTALLATION_ID),
  });

  return new Octokit({ auth: installationAuth.token });
}