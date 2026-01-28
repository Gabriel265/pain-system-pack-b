// src/app/website/projects.js

import React from 'react';

export default function ProjectsHub() {
  return (
    <div className="projects-hub">
      <h1>Projects Hub</h1>
      <p>Explore our project lifecycle: Live, In-Build, and Concept stages.</p>
      <div className="project-cards">
        <div className="project-card">
          <h2>Project Alpha</h2>
          <p>Status: Live</p>
        </div>
        <div className="project-card">
          <h2>Project Beta</h2>
          <p>Status: In-Build</p>
        </div>
        <div className="project-card">
          <h2>Project Gamma</h2>
          <p>Status: Concept</p>
        </div>
      </div>
    </div>
  );
}
