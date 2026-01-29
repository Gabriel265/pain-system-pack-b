// src/components/common/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          <Link href="/tools" className="hover:underline">Tools</Link>
        </div>
        <Link href="/login" className="hover:underline">Login</Link>
      </nav>
    </header>
  );
}
