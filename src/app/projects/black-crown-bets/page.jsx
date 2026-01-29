// src/app/projects/black-crown-bets/page.jsx
import Link from 'next/link';

export default function BlackCrownBets() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Black Crown Bets – Framework</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Operations</h2>
          <p className="mt-2">Preview – Not Live</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Risk Overview</h2>
          <p className="mt-2">Preview – Not Live</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Licence Path</h2>
          <p className="mt-2">Preview – Not Live</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Private Control Area</h2>
          <p className="mt-2">Preview – Not Live</p>
        </div>
      </div>
    </div>
  );
}
