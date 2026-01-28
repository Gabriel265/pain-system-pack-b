import { NextResponse } from 'next/server';

let latestRun = {
  id: null,
  status: 'IDLE',
  safeToMerge: 'No',
  timestamp: '',
  summary: '',
};

export async function GET() {
  return NextResponse.json(latestRun);
}

export async function POST(request) {
  try {
    const { status, safeToMerge, summary } = await request.json();
    latestRun = {
      id: new Date().getTime().toString(),
      status,
      safeToMerge,
      timestamp: new Date().toISOString(),
      summary,
    };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update latest run' }, { status: 500 });
  }
}
