import { NextResponse } from 'next/server';

let runtimeState = {
  status: 'NO RUN',
};

export async function GET() {
  return NextResponse.json(runtimeState);
}
