/*
 * Shared utilities for GitHub API interactions + Vercel status.
 */
import { Octokit } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";

export async function getOctokit() {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  const installationAuth = await auth({
    type: "installation",
    installationId: Number(process.env.GITHUB_INSTALLATION_ID),
  });

  return new Octokit({ auth: installationAuth.token });
}

export async function getBuildStatuses(pullNumber) {
  const octokit = await getOctokit();
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  // ──────────────────────────────────────────────────────────────
  // 1. GitHub Checks (correct endpoint: use commit SHA from PR)
  // ──────────────────────────────────────────────────────────────
  let githubCI = { 
    status: 'not_run', 
    conclusion: 'neutral', 
    logs: '', 
    detailsUrl: '' 
  };

  try {
    // Step 1: Get the PR to fetch its head commit SHA
    const { data: pr } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      { owner, repo, pull_number: pullNumber }
    );

    // Step 2: Get check-runs for that commit
    const { data: checks } = await octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
      {
        owner,
        repo,
        ref: pr.head.sha,
        per_page: 30,  // enough to find our workflow
      }
    );

    // Find our CI workflow (name from .github/workflows/...yml)
    const ciRun = checks.check_runs?.find(
      run => run.name === "AI-Lab CI (Lint + Build)" || run.name.includes("build")
    );

    if (ciRun) {
      githubCI = {
        status: ciRun.status,           // queued, in_progress, completed
        conclusion: ciRun.conclusion,   // success / failure / neutral / cancelled / ...
        logs: ciRun.output?.summary || ciRun.output?.text || '',
        detailsUrl: ciRun.html_url || ciRun.details_url,
      };
    }
  } catch (err) {
    console.error('GitHub checks fetch failed:', err);
    githubCI.logs = 'Failed to fetch GitHub checks: ' + (err.message || 'Unknown');
  }

  // ──────────────────────────────────────────────────────────────
  // 2. Vercel Deployment (use correct v6 API version!)
  // ──────────────────────────────────────────────────────────────
  let vercelDeploy = { status: 'unknown', url: '', error: '' };

  try {
    const query = new URLSearchParams({
      limit: '1',
      branch: 'ai-lab',
    });

    // Use project slug + team slug if no numeric ID
    // Vercel v6 supports ?projectName=... but it's less reliable → prefer ID if you can add it
    if (process.env.VERCEL_PROJECT_ID) {
      query.set('projectId', process.env.VERCEL_PROJECT_ID);
    } else {
      // Fallback using slug (may return multiple if name collision)
      query.set('projectName', process.env.VERCEL_PROJECT_SLUG);
    }

    if (process.env.VERCEL_TEAM_ID) query.set('teamId', process.env.VERCEL_TEAM_ID);

    const res = await fetch(`https://api.vercel.com/v6/deployments?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Vercel API error: ${res.status} - ${errText}`);
    }

    const { deployments } = await res.json();

    if (deployments?.length > 0) {
      const dep = deployments[0];
      vercelDeploy.status = dep.state || dep.readyState || 'unknown'; // QUEUED, BUILDING, READY, ERROR, CANCELED
      vercelDeploy.url = dep.url ? `https://${dep.url}` : '';

      // Fetch error logs if failed
      if (['ERROR', 'CANCELED'].includes(vercelDeploy.status)) {
        try {
          const logsRes = await fetch(
            `https://api.vercel.com/v6/deployments/${dep.id}/builds?limit=1`,
            { headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` } }
          );
          if (logsRes.ok) {
            const builds = await logsRes.json();
            if (builds.builds?.length > 0) {
              vercelDeploy.error = builds.builds[0].output?.join('\n') || 'Build failed – see Vercel dashboard.';
            }
          }
        } catch (logsErr) {
          vercelDeploy.error = 'Failed to fetch logs: ' + logsErr.message;
        }
      }
    } else {
      vercelDeploy.status = 'no_deploy_found';
      vercelDeploy.error = 'No recent deployment on ai-lab branch';
    }
  } catch (err) {
    console.error('Vercel status fetch failed:', err);
    vercelDeploy.error = 'Could not fetch Vercel status: ' + (err.message || 'Unknown');
  }

  return { githubCI, vercelDeploy };
}