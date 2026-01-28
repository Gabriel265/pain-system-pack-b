// src/app/website/projects/page.js
export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1>Our Projects</h1>
      <p>Discover the initiatives and projects that Pain System is currently developing.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4">
          <h2>Example Project 1</h2>
          <p>Coming Online</p>
        </div>
        <div className="bg-gray-200 p-4">
          <h2>Example Project 2</h2>
          <p>Coming Online</p>
        </div>
        <div className="bg-gray-200 p-4">
          <h2>Example Project 3</h2>
          <p>Coming Online</p>
        </div>
      </div>
    </div>
  );
}
