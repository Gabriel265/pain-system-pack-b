import { NextResponse } from 'next/server';

let runtimeState = {
  status: 'NO RUN',
  verified: false,
};

export async function GET() {
  return NextResponse.json(runtimeState);
}

export async function POST(request) {
  try {
    const { status, verified } = await request.json();
    runtimeState = { status, verified };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update runtime state' }, { status: 500 });
  }
}
