// src/app/projects/pt/page.jsx

import Link from 'next/link';

export default function PTFramework() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">PT Framework</h1>
      <p className="text-red-500 mb-4">Preview – Not Live</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="tile bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Training Levels</h2>
        </div>
        <div className="tile bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">AI Coach</h2>
        </div>
        <div className="tile bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Nutrition</h2>
        </div>
        <div className="tile bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Apparel</h2>
        </div>
      </div>
    </div>
  );
}
