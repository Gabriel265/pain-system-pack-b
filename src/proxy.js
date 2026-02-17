// src/middleware.js
import { NextResponse } from 'next/server';
import { rateLimiter } from './utils/rateLimiter';
import { validateRequest } from './utils/validateRequest';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get('user_role')?.value;

  // Authentication protection
  if (pathname.startsWith('/admin') || pathname.startsWith('/ai-lab') || pathname.startsWith('/api')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rate limiting
  if (!rateLimiter(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Request validation
  if (!validateRequest(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/ai-lab/:path*',
    '/api/:path*',
  ],
};