// src/app/api/_middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // CORS allowlist
  const allowedOrigins = process.env.CORS_ORIGINS.split(',');
  const origin = request.headers.get('origin');

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'CORS not allowed' }, { status: 403 });
  }

  return NextResponse.next();
}
