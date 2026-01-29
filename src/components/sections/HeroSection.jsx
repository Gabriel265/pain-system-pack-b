// src/components/sections/HeroSection.jsx

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Pain System</h1>
        <p className="text-lg mb-8">Your one-stop solution for project management.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <a className="btn btn-primary">Build</a>
          </Link>
          <Link href="/dashboard">
            <a className="btn btn-primary">Deploy</a>
          </Link>
          <Link href="/dashboard">
            <a className="btn btn-primary">Package</a>
          </Link>
          <Link href="/dashboard">
            <a className="btn btn-primary">Explore</a>
          </Link>
        </div>
      </div>
    </section>
  );
}
