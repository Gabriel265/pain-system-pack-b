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

  const octokit = new Octokit({ auth: installationAuth.token });

  // ───── TEMP DEBUG: Check effective permissions ─────
  try {
    // This endpoint returns the app's permissions for the installation
    const { data } = await octokit.request("GET /app/installations/{installation_id}", {
      installation_id: process.env.GITHUB_INSTALLATION_ID,
    });
    console.log("[DEBUG] Installation permissions:", JSON.stringify(data.permissions, null, 2));
  } catch (debugErr) {
    console.error("[DEBUG] Failed to log permissions:", debugErr.message);
  }
  // ──────────────────────────────────────────────────

  return octokit;

  //return new Octokit({ auth: installationAuth.token });
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
let vercelDeploy = { 
  status: 'unknown', 
  url: '', 
  error: '', 
  fullError: ''   // This will hold the complete text for the modal
};

try {
  const query = new URLSearchParams({
    limit: '1',
    branch: 'ai-lab',
  });

  if (process.env.VERCEL_PROJECT_ID) {
    query.set('projectId', process.env.VERCEL_PROJECT_ID);
  } else if (process.env.VERCEL_PROJECT_SLUG) {
    query.set('projectName', process.env.VERCEL_PROJECT_SLUG);
  }

  if (process.env.VERCEL_TEAM_ID) query.set('teamId', process.env.VERCEL_TEAM_ID);

  const res = await fetch(`https://api.vercel.com/v6/deployments?${query.toString()}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  });

  if (!res.ok) throw new Error(await res.text());

  const { deployments } = await res.json();

  if (deployments?.length > 0) {
    const dep = deployments[0];
    vercelDeploy.status = dep.state || dep.readyState || 'unknown';
    vercelDeploy.url = dep.url ? `https://${dep.url}` : '';

    if (['ERROR', 'CANCELED'].includes(vercelDeploy.status)) {
  let fullText = dep.errorMessage || 
                 (dep.errorCode ? `${dep.errorCode}: Build command failed` : 'Build failed');

  fullText += `\n\nBuild command (npm run build) exited with code 1.`;
  fullText += `\nCommon causes in Next.js:`;
  fullText += `\n  • Syntax error or invalid JS/TS`;
  fullText += `\n  • Missing import or module not found`;
  fullText += `\n  • Runtime error during static generation`;
  fullText += `\n  • Invalid Tailwind/PostCSS config`;
  fullText += `\n  • Dependency version mismatch`;

  if (dep.meta?.githubCommitMessage) {
    fullText += `\n\nTriggered by commit: "${dep.meta.githubCommitMessage}"`;
  }

  fullText += `\n\nDeployment created: ${new Date(dep.createdAt).toLocaleString()}`;
  fullText += `\nBranch: ai-lab`;
  fullText += `\nProject: ${dep.name}`;

  if (dep.inspectorUrl) {
    fullText += `\n\nIf you need the raw build output (lines, timestamps, webpack details):\n${dep.inspectorUrl}`;
  }

  vercelDeploy.fullError = fullText.trim();
  vercelDeploy.error = dep.errorMessage || 'npm run build failed (code 1)';
}
  } else {
    vercelDeploy.status = 'no_deploy_found';
    vercelDeploy.error = 'No recent deployment on ai-lab branch';
  }
} catch (err) {
  console.error('Vercel fetch error:', err);
  vercelDeploy.error = 'Failed to fetch Vercel deployment: ' + err.message;
}

  return { githubCI, vercelDeploy };
}