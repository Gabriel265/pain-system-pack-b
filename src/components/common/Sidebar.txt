// src/components/common/Sidebar.js
import Link from "next/link";

export default function Sidebar({ type }) {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        <li>
          <Link href="/admin/projects">
            <a className={type === "admin" ? "font-bold" : ""}>Admin Projects</a>
          </Link>
        </li>
        <li>
          <Link href="/ai-lab">
            <a className={type === "ai-lab" ? "font-bold" : ""}>AI Lab</a>
          </Link>
        </li>
        <li>
          <Link href="/biab">
            <a className={type === "biab" ? "font-bold" : ""}>BIAB</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
