// middleware.js (root level)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get('user_role')?.value;

  // Your existing admin protection
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/(auth)/login', request.url));
    }
  }

  // NEW: Protect AI Agent dashboard + all its APIs
  if (
    pathname.startsWith('/ai-agent') ||
    pathname.startsWith('/api/agent')
  ) {
    if (role !== 'admin') {
      // Redirect to login (consistent with admin)
      return NextResponse.redirect(new URL('/(auth)/login', request.url));
      // OR for APIs: return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/ai-agent/:path*',
    '/api/agent/:path*',
  ],
};