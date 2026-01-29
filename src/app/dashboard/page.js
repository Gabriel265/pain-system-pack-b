// src/app/dashboard/page.js

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check user role
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_role'))
      ?.split('=')[1];

    if (role !== 'admin') {
      router.push('/(auth)/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Phase-1 Preview – Controls Coming Online</h1>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
          Build Tool
        </button>
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
          Build Website
        </button>
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
          Deploy Tool
        </button>
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
          Package & Send
        </button>
      </div>
    </div>
  );
}
