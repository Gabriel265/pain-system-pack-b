// src/components/common/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link href="/">Home</Link>
          <Link href="/about" className="ml-4">About</Link>
          <Link href="/contact" className="ml-4">Contact</Link>
          <Link href="/accessibility" className="ml-4">Accessibility</Link>
          <Link href="/how-it-works" className="ml-4">How It Works</Link>
        </div>
        <div>
          <Link href="/login" className="ml-4">Login</Link>
        </div>
      </nav>
    </header>
  );
}
