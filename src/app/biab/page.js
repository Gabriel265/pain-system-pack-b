// src/app/biab/page.js
"use client";
import Link from "next/link";

export default function BIABMainPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Business in a Box (BIAB)
      </h1>

      <p className="mb-4">
        Outputs are AI-generated reference packs. Founder approval required before sale/deployment.
      </p>

      <Link
        href="/biab/intake"
        className="text-blue-500 hover:underline"
      >
        Start New Project
      </Link>
    </div>
  );
}
