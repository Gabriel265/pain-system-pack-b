// src/components/common/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li><Link href="/website">Home</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#contact">Contact</Link></li>
          <li><Link href="/accessibility">Accessibility</Link></li>
        </ul>
      </nav>
    </footer>
  );
}
