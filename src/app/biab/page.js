// src/app/biab/page.js
"use client";
import { useState } from "react";
import Link from "next/link";

export default function BIABMainPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Business in a Box (BIAB)</h1>
      <p className="mb-4">Outputs are AI-generated reference packs. Founder approval required before sale/deployment.</p>
      <Link href="/biab/intake">
        <a className="text-blue-500">Start New Project</a>
      </Link>
    </div>
  );
}
