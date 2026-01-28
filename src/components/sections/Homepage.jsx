// src/components/sections/Homepage.jsx

import React from 'react';

export default function Homepage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to the PAIN System</h1>
        <p>
          The PAIN System is a governance-first platform that transforms ideas into safe, deployable systems.
        </p>
        <button className="cta">Enter the System</button>
      </section>

      <section className="entry-paths">
        <h2>Choose Your Path</h2>
        <div className="path corporate">
          <h3>Corporate</h3>
          <p>Empowering businesses with structured governance.</p>
        </div>
        <div className="path painverse">
          <h3>Painverse</h3>
          <p>Explore innovative solutions in a virtual realm.</p>
        </div>
        <div className="path children">
          <h3>Children</h3>
          <p>Fostering creativity and learning in young minds.</p>
        </div>
      </section>

      <section className="philosophy">
        <h2>Our Philosophy</h2>
        <p>
          We believe in dignity, access, and governance, ensuring human-in-the-loop AI for safe and ethical solutions.
        </p>
      </section>
    </div>
  );
}
