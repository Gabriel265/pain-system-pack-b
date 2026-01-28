import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate fetching the latest run data
    const latestRun = {
      id: "123",
      status: "NEEDS REVIEW",
      safeToMerge: "No",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(latestRun);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch latest run" }, { status: 500 });
  }
}
