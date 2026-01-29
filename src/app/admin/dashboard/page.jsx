// src/app/admin/dashboard/page.jsx
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/builder">
        <div className="tile bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition">
          <h2 className="text-xl font-bold">Side Projects</h2>
        </div>
      </Link>
      <Link href="/assets">
        <div className="tile bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition">
          <h2 className="text-xl font-bold">Assets</h2>
        </div>
      </Link>
      <Link href="/ideas">
        <div className="tile bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition">
          <h2 className="text-xl font-bold">Ideas</h2>
        </div>
      </Link>
      <div className="tile bg-gray-500 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Notes Preview</h2>
        <p className="mt-2">Notes Coming Online.</p>
      </div>
      <div className="tile bg-white text-black p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Theme Preview</h2>
        <div className="mt-4">
          <div className="p-4 mb-2 rounded-lg" style={{ backgroundColor: '#FF5733' }}>
            <p className="text-white">Theme 1: Sunset Orange</p>
          </div>
          <div className="p-4 mb-2 rounded-lg" style={{ backgroundColor: '#33FF57' }}>
            <p className="text-white">Theme 2: Lime Green</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#3357FF' }}>
            <p className="text-white">Theme 3: Ocean Blue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
