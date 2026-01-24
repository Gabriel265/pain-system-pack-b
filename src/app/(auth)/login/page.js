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
          <div className="h-16 md:h-20"></div>

          {/* Left side - Login form */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 md:p-10 border border-white/30 dark:border-gray-700/30">
              {/* Header */}
              <div className="mb-8">
                <p className="text-sm text-gray-500  mb-2">Your logo</p>
                <h1 className="text-4xl font-bold text-gray-800">Login</h1>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                  type="email"
                  placeholder="example@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 /80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 /80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="block w-full text-center py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Hero section */}
          {/* Removed background image - replaced with placeholder */}
          <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[400px] lg:min-h-full bg-gradient-to-br from-orange-400/20 to-orange-600/20 flex items-center justify-center">
            <div className="text-white/70 text-center p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome Back
              </h2>
              <p className="text-lg">
                Sign in to access your dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}