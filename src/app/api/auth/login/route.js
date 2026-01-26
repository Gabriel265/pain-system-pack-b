// src/app/api/auth/login/route.js

// Import required Next.js utilities for handling cookies and responses
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * POST handler for /api/auth/login
 * Authenticates admin user using email/password from environment variables
 * Sets a secure HTTP-only cookie on successful login
 *
 * @param {Request} request - The incoming request with JSON body containing email and password
 * @returns {Promise<NextResponse>} - Success response with cookie set or 401 error
 */
export async function POST(request) {
  // Parse the request body to get credentials
  const { email, password } = await request.json();

  // Load admin credentials from environment variables
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Validate credentials against environment variables
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create success response
    const response = NextResponse.json({ role: "admin" });

    // Set secure HTTP-only cookie for admin role
    response.cookies.set("user_role", "admin", {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Secure in production only
      path: "/", // Available throughout the site
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration (in seconds)
    });

    return response;
  }

  // Return error for invalid credentials
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
