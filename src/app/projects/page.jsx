// src/app/projects/page.jsx
import Link from 'next/link';

export default function ProjectsHub() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects Hub</h1>
      <ul className="list-disc pl-6">
        <li>
          <Link href="/projects/black-crown-bets">
            Black Crown Bets – Framework
          </Link>
        </li>
        {/* Add other projects here */}
      </ul>
    </div>
  );
}
