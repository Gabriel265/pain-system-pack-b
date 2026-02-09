// src/app/api/auth/login/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ role: 'admin' });
    response.cookies.set('user_role', 'admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
