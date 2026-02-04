export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Environment variables for GitHub API configuration
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || "main";
const token = process.env.GITHUB_TOKEN;

// Path to the projects data file in the repository
const githubFilePath = "src/project-store/projects.json";

/* --------------------- Helper Functions --------------------- */

/**
 * Fetches the current projects.json from GitHub
 * @returns {Promise<Array>} Array of projects or empty array on failure
 */
async function getFromGitHub() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${githubFilePath}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "NextApp",
        },
      },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const decoded = Buffer.from(data.content, "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch (err) {
    return [];
  }
}

/**
 * Pushes updated projects data back to GitHub
 * @param {string} updatedJSON - The stringified JSON content to push
 */
async function pushToGitHub(updatedJSON) {
  if (!owner || !repo || !token) return;

  // Get current file metadata (required for SHA)
  const metaRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${githubFilePath}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "NextApp",
      },
    },
  );

  if (!metaRes.ok) {
    return;
  }

  const meta = await metaRes.json();

  // Update file with new content
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${githubFilePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "NextApp",
      },
      body: JSON.stringify({
        message: "Update projects.json",
        content: Buffer.from(updatedJSON).toString("base64"),
        sha: meta.sha,
        branch,
      }),
    },
  );
}

/**
 * Checks if the request comes from an authenticated admin user
 * @param {Request} req - The incoming request
 * @returns {boolean} True if user has admin role
 */
function isAdmin(req) {
  const role = req.cookies.get("user_role")?.value;
  return role === "admin";
}

/* --------------------- API Route Handlers --------------------- */

/**
 * GET /api/projects
 * Returns all projects from GitHub
 */
export async function GET() {
  const data = await getFromGitHub();
  return NextResponse.json(data);
}

/**
 * POST /api/projects
 * Creates a new project (admin only)
 */
export async function POST(req) {
  // Require admin privileges
  if (!isAdmin(req)) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const projects = await getFromGitHub();

  // Generate ID and timestamps if not provided
  body.id = body.id || Date.now().toString();
  body.createdAt = new Date().toISOString();
  body.updatedAt = new Date().toISOString();

  // Add new project to array
  projects.push(body);

  // Save changes to GitHub
  await pushToGitHub(JSON.stringify(projects, null, 2));

  return NextResponse.json({ success: true, item: body });
}

/**
 * PUT /api/projects
 * Updates an existing project (admin only)
 */
export async function PUT(req) {
  if (!isAdmin(req)) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  let projects = await getFromGitHub();

  // Update project with matching ID
  projects = projects.map((p) =>
    p.id === body.id
      ? { ...p, ...body, updatedAt: new Date().toISOString() }
      : p,
  );

  await pushToGitHub(JSON.stringify(projects, null, 2));

  return NextResponse.json({ success: true, item: body });
}

/**
 * DELETE /api/projects?id={projectId}
 * Deletes a project by ID (admin only)
 */
export async function DELETE(req) {
  if (!isAdmin(req)) return new NextResponse("Unauthorized", { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  let projects = await getFromGitHub();

  // Remove project with matching ID
  projects = projects.filter((p) => p.id !== id);

  await pushToGitHub(JSON.stringify(projects, null, 2));

  return NextResponse.json({ success: true });
}
