import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';

export async function getOctokit() {
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