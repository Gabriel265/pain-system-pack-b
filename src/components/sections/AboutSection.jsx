// src/components/sections/AboutSection.jsx

import React from 'react';

export default function AboutSection() {
  return (
    <section className="about bg-white text-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">About the Pain System</h2>
        <p className="text-lg mb-6">
          The Pain System is crafted to be a foundational tool that supports diverse applications, from corporate environments to creative endeavors and educational initiatives.
        </p>
        <p className="text-base text-gray-700">
          With a focus on accessibility and adaptability, we ensure that our platform remains open-ended, ready to grow and transform alongside your projects.
        </p>
      </div>
    </section>
  );
}
