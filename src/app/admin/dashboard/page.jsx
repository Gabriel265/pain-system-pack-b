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
    </div>
  );
}
