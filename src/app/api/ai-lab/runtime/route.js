import { NextResponse } from 'next/server';

let runtimeState = {
  run_id: null,
  status: 'NO RUN DETECTED',
  timestamp: null,
};

export async function GET() {
  return NextResponse.json(runtimeState);
}
