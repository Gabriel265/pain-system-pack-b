import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Pain System</div>
        <nav className="space-x-4">
          <Link href="/">
            <a className="text-gray-700 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-700 hover:text-gray-900">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-700 hover:text-gray-900">Contact</a>
          </Link>
          <Link href="/business-in-a-box">
            <a className="text-gray-700 hover:text-gray-900">Business in a Box</a>
          </Link>
          <Link href="/login">
            <a className="text-gray-700 hover:text-gray-900">Login</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
