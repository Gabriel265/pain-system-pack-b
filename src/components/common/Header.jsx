// src/components/common/Header.jsx

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pain System</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/projects">Projects</Link></li> {/* Added Projects link */}
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
