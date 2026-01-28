// src/app/website/projects/page.jsx

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Projects Hub</h1>
      <p className="mb-8">
        Welcome to the Projects Hub of the Pain System. Here, we explore various initiatives and developments aimed at enhancing our system's capabilities. Stay tuned as we bring these projects online.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Example Project 1</h2>
          <p className="text-gray-600">Coming Online</p>
        </div>
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Example Project 2</h2>
          <p className="text-gray-600">Coming Online</p>
        </div>
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Example Project 3</h2>
          <p className="text-gray-600">Coming Online</p>
        </div>
      </div>
    </div>
  );
}
