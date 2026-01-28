// src/components/common/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link href="/website">Home</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#contact">Contact</Link></li>
          <li><Link href="/accessibility">Accessibility</Link></li>
        </ul>
      </nav>
    </header>
  );
}
