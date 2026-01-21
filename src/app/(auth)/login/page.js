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
        backgroundColor: '#000', // black background
      }}
    >

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Main card container */}
      <div className="relative w-full max-w-6xl bg-black/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Spacer for top padding */}
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-bold text-white mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full p-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <Link href="/forgot-password" className="text-sm text-gray-400 hover:underline mt-4">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
