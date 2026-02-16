// src/app/api/health/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'unknown',
  });
}
