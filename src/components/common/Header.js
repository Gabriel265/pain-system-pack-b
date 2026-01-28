// src/components/common/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div className="flex space-x-4">
          <Link href="/website"><a>Home</a></Link>
          <Link href="/website/projects"><a>Projects</a></Link>
          <Link href="/website/services"><a>Services</a></Link>
          <Link href="/website#about"><a>About</a></Link>
          <Link href="/website#contact"><a>Contact</a></Link>
        </div>
      </nav>
    </header>
  );
}
