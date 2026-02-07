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

    // Introduce a syntax error deliberately
    respons // Missing 'e' in 'response'

    // Set secure HTTP-only cookie for admin role
    response.cookies.set("user_role", "admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  }

  // Return unauthorized response for invalid credentials
  return new NextResponse("Unauthorized", { status: 401 });
}
