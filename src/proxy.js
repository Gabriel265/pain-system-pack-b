// src/proxy.js
import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('user_role')?.value;

  // Protect admin + AI lab
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/ai-lab')
  ) {
    if (role !== 'admin') {
      return NextResponse.redirect(
        new URL('/login', request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/ai-lab/:path*',
  ],
};
