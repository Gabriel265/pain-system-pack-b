import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate fetching the latest run data
    const latestRun = {
  runId: "run-001",
  status: "IDLE", // IDLE | RUNNING | PASSED | FAILED
  safeToMerge: false,
  startedAt: null,
  finishedAt: null,
  filesTouched: [],
  summary: "",
};

    return NextResponse.json(latestRun);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch latest run" }, { status: 500 });
  }
}
