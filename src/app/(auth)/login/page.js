// src/app/(auth)/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  // State for form inputs and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /**
   * Handles form submission
   * Sends credentials to the login API and redirects based on role
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { role } = await res.json();
        // Redirect based on user role
        if (role === "admin") {
          router.push("/admin/projects");
        } else {
          router.push("/portal/dashboard");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 transition-all duration-300 relative"
      style={{
        // Background image removed - replaced with solid color fallback
        backgroundColor: "#f9f9f9", // light gray fallback
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-[#fcd5c5]/80  backdrop-blur-sm"></div>

      {/* Main card container */}
      <div className="relative w-full max-w-6xl bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 ">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Spacer for top padding */}
          <div className="h-16 md:h-20"></div>

          {/* Syntax error introduced here */}
          <div>{/* Missing closing tag */}
        </div>
      </div>
    </div>
  );
}
