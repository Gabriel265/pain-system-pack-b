// src/app/builder/page.js

export default function ProjectBuilder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Project Builder – Phase-1 Preview</h1>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed" disabled>
          Start Project
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded opacity-50 cursor-not-allowed" disabled>
          Save Draft
        </button>
      </div>
    </div>
  );
}
