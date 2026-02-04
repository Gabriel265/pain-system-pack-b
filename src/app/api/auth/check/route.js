// Import required Next.js utilities for handling cookies and responses
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET handler for /api/auth/check
 * Checks if the current user has admin privileges by looking at the 'user_role' cookie
 *
 * @returns {Promise<NextResponse>} - JSON response with role if admin, or 401 Unauthorized
 */
export async function GET() {
  // Retrieve the user_role cookie
  const role = cookies().get("user_role")?.value;

  // Check if the user has admin role
  if (role === "admin") {
    // Return success response with role information
    return NextResponse.json({ role: "admin" });
  }

  // Return unauthorized response for non-admin users
  return new NextResponse("Unauthorized", { status: 401 });
}
