// src/app/middleware.js
import { NextResponse } from 'next/server';
import { rateLimiter } from './utils/rateLimiter';
import { validateCors } from './utils/cors';
import { attachRequestId, logRequest } from './utils/logging';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get('user_role')?.value;

  // Access protection for AI Lab and Admin routes
  if (pathname.startsWith('/ai-lab') || pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    const [scheme, encoded] = authHeader ? authHeader.split(' ') : [];
    if (scheme !== 'Basic' || !encoded) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
    if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rate limiting
  const rateLimitResult = rateLimiter(request);
  if (rateLimitResult) {
    return NextResponse.json({ error: 'rate_limited', retryAfterSeconds: rateLimitResult.retryAfter, requestId: rateLimitResult.requestId }, { status: 429 });
  }

  // CORS validation
  const corsResult = validateCors(request);
  if (corsResult) {
    return NextResponse.json({ error: 'CORS not allowed' }, { status: 403 });
  }

  // Attach request ID and log request
  const requestId = attachRequestId(request);
  logRequest(request, requestId);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/ai-lab/:path*',
    '/api/:path*',
  ],
};