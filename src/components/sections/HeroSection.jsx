// src/components/sections/HeroSection.jsx

import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero bg-neutral-100 text-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Pain System</h1>
        <p className="text-lg mb-6">
          The Pain System is a versatile platform designed to adapt seamlessly across Corporate, Creative (Painverse), and Education (Children) sectors.
        </p>
        <p className="text-base text-gray-700">
          Our mission is to provide a calm, intelligent, and trustworthy environment that evolves with your needs.
        </p>
      </div>
    </section>
  );
}
