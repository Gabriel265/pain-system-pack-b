// src/app/api/_middleware.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { auditLog } from './audit';

export function middleware(request) {
  const allowedOrigins = process.env.CORS_ORIGINS.split(',');
  const origin = request.headers.get('origin');

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'CORS not allowed' }, { status: 403 });
  }

  // Correlation ID
  const correlationId = request.headers.get('x-correlation-id') || uuidv4();
  request.headers.set('x-correlation-id', correlationId);

  // Rate Limiting
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  const rateLimit = 60; // requests per minute
  const rateLimitKey = `rate-limit:${ip}`;
  const currentCount = parseInt(request.headers.get(rateLimitKey) || '0', 10);

  if (currentCount >= rateLimit) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  request.headers.set(rateLimitKey, currentCount + 1);

  // Audit Log
  auditLog(request, { action: 'request', correlationId });

  return NextResponse.next();
}
