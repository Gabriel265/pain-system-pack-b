// src/app/(auth)/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  // State for form inputs and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { role } = await res.json();
        // Redirect based on user role
        if (role === 'admin') {
          router.push('/admin/projects');
        } else {
          router.push('/portal/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 transition-all duration-300 relative"
      style={{
        // Background image removed - replaced with solid color fallback
        backgroundColor: '#f9f9f9', // light gray fallback
      }}
    >

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-[#fcd5c5]/80 dark:bg-gray-900/80 backdrop-blur-sm"></div>

      {/* Main card container */}
      <div className="relative w-full max-w-6xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/20">
        
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Spacer for top padding */}
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-600">Testing AI Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
