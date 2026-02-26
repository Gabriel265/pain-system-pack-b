/*
 * Main API route for running the AI agent.
 * Handles POST /api/ai-lab/run with { prompt }.
 * Fetches repo context, calls OpenAI, applies changes to 'ai-lab' branch, creates/updates PR.
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getOctokit, getBuildStatuses } from "../_shared";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string" || prompt.length > 3000) {
      return NextResponse.json({ error: "Invalid or missing prompt" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set in environment variables");

    const octokit = await getOctokit();

    // Get repo tree from ai-deploy
    const { data: tree } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/ai-deploy?recursive=1",
      { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO }
    );

    const paths = tree.tree.filter((t) => t.type === "blob").map((t) => t.path);

    // Fetch file contents (limit to avoid token explosion)
    const contents = {};
    for (const path of paths.slice(0, 60)) {
      try {
        const { data } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO, path, ref: "ai-deploy" }
        );
        contents[path] = Buffer.from(data.content, "base64").toString("utf-8");
      } catch {}
    }

    const context = Object.entries(contents)
      .map(([p, c]) => "--- " + p + " ---\n" + c.slice(0, 2000) + "\n")
      .join("\n")
      .slice(0, 45000);

    const system =
      "You are an expert Next.js developer.\n" +
      "Rules:\n" +
      "- Only change files relevant to the task\n" +
      "- Never delete files\n" +
      "- Never change auth, env, pricing, analytics or security code\n" +
      "- Keep existing style & structure\n" +
      "- Use server components when appropriate\n" +
      "- Return ONLY valid JSON, nothing else\n\n" +
      "If you need a new external package that is NOT already in the project:\n" +
      "- ONLY request packages that are truly necessary\n" +
      "- Include them in \"newDependencies\" array\n" +
      "- Use exact version (e.g. \"0.33.5\")\n" +
      "- Use \"dependencies\" or \"devDependencies\" as type\n\n" +
      "Repo context (partial):\n" + context +
      "\nRespond with this exact JSON structure (no extra text):\n" +
      "{ \"summary\": \"One sentence description of the changes\", \"files\": [{\"path\": \"path/to/file.js\", \"action\": \"modify\"|\"create\", \"content\": \"complete file content\"}], \"newDependencies\": [{\"name\": \"package name\", \"version\": \"exact semver version\", \"type\": \"dependencies\" | \"devDependencies\", \"reason\": \"One clear sentence explaining WHY this package is truly necessary for this task\", \"diff\": \"The exact line(s) that would be added to package.json, e.g. + \\\"lodash\\\": \\\"^4.17.21\\\"\"}]}";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: system }, { role: "user", content: prompt }],
      temperature: 0.15,
      max_tokens: 12000,
      response_format: { type: "json_object" },
    });

    let response;
    try {
      response = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      throw new Error("AI returned invalid JSON");
    }

    if (!response.summary || !Array.isArray(response.files)) throw new Error("Invalid AI response format: missing summary or files");

    // Handle dependency requests
    if (response.newDependencies && Array.isArray(response.newDependencies) && response.newDependencies.length > 0) {
      const validDeps = response.newDependencies.every(
        (d) =>
          d.name && typeof d.name === "string" &&
          d.version && typeof d.version === "string" &&
          ["dependencies", "devDependencies"].includes(d.type) &&
          d.reason && typeof d.reason === "string" &&
          d.diff && typeof d.diff === "string"
      );
      if (!validDeps) throw new Error("AI returned incomplete newDependencies (missing reason or diff)");

      return NextResponse.json({
        success: true,
        needsApproval: true,
        dependencies: response.newDependencies,
        summary: response.summary,
      });
    }

    // Reset or create ai-lab branch from ai-deploy
    const { data: base } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/refs/heads/ai-deploy",
      { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO }
    );

    try {
      await octokit.request("PATCH /repos/{owner}/{repo}/git/refs/heads/ai-lab", {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        sha: base.object.sha,
        force: true,
      });
    } catch (e) {
      if (e.status === 422 || e.status === 404) {
        await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
          owner: process.env.GITHUB_OWNER,
          repo: process.env.GITHUB_REPO,
          ref: "refs/heads/ai-lab",
          sha: base.object.sha,
        });
      } else throw e;
    }

    // Apply file changes
    for (const file of response.files) {
      if (!["modify", "create"].includes(file.action)) continue;

      let sha = null;
      try {
        const { data } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO, path: file.path, ref: "ai-lab" }
        );
        sha = data.sha;
      } catch (e) {
        if (e.status !== 404) throw e;
      }

      const commitMessage = "AI proposal: " + (response.summary || "Untitled changes");
      const contentBase64 = Buffer.from(file.content).toString("base64");
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: file.path,
        message: commitMessage,
        content: contentBase64,
        sha: sha,
        branch: "ai-lab",
      });
    }

    // Precompute strings for PR
    const prTitle = "AI Proposal: " + (response.summary || "Untitled changes");
    const projectSlug = (process.env.VERCEL_PROJECT_SLUG || process.env.GITHUB_REPO || "unknown-project")
      .toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const teamSlug = process.env.VERCEL_TEAM_SLUG ? "-" + process.env.VERCEL_TEAM_SLUG : "";
    const previewUrl = "https://" + projectSlug + "-git-ai-lab" + teamSlug + ".vercel.app";
    const prBody =
      "**Prompt:** " + prompt + "\n\n**AI Response:**\n```json\n" +
      JSON.stringify(response, null, 2) + "\n```\n\n**Preview URL:** " + previewUrl +
      "\n\n**Generated by AI**  \nReview carefully before merging.";

    let pr;
    const { data: existing } = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      head: "ai-lab",
      base: "ai-deploy",
      state: "open",
    });

    let prNumber;
    if (existing.length > 0) {
      pr = await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        pull_number: existing[0].number,
        title: prTitle,
        body: prBody,
      });
      prNumber = existing[0].number;
    } else {
      pr = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        title: prTitle,
        body: prBody,
        head: "ai-lab",
        base: "ai-deploy",
      });
      prNumber = pr.data.number;
    }

    const initialStatuses = await getBuildStatuses(prNumber).catch(() => ({
      githubCI: { conclusion: "unknown" },
      vercelDeploy: { status: "unknown" },
    }));

    const updatedBody = prBody + "\n\n**Initial Build Statuses:**\nGitHub CI: " + initialStatuses.githubCI.conclusion +
      "\nVercel: " + initialStatuses.vercelDeploy.status;

    await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      pull_number: prNumber,
      body: updatedBody,
    }).catch((e) => console.error("Failed to update PR body with statuses:", e));

    return NextResponse.json({
      success: true,
      summary: response.summary,
      runId: prNumber.toString(),
      previewUrl: previewUrl,
      status: "Proposal created – awaiting review",
    });

  } catch (error) {
    console.error("Run error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}