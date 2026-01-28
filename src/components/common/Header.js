// src/components/common/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/business-in-a-box">Business in a Box</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/accessibility">Accessibility</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
