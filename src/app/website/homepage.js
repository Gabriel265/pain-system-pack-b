// src/app/website/homepage.js

import React from 'react';

export default function Homepage() {
  return (
    <div className="homepage">
      <section className="intro">
        <h1>Welcome to the Pain System</h1>
        <p>The Pain System is designed to support corporate, public sector, education, and creators in managing their projects efficiently.</p>
        <p>Our system prioritizes accessibility and clarity, ensuring that everyone can engage with ease.</p>
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>At a high level, the Pain System streamlines project management through structured processes and clear communication.</p>
      </section>
      <section className="accessibility">
        <h2>Accessibility-First</h2>
        <p>We are committed to making our platform accessible to all users, ensuring an inclusive experience.</p>
      </section>
    </div>
  );
}
