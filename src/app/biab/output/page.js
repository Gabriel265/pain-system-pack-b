// src/app/biab/output/page.js
"use client";

export default function BIABOutput() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">BIAB Pack Output</h1>
        <div className="space-y-4">
          <div><strong>Business Summary:</strong> [Summary]</div>
          <div><strong>Recommended Modules:</strong> [Modules]</div>
          <div><strong>Website Pages:</strong> [Pages]</div>
          <div><strong>Dashboard Sections:</strong> [Sections]</div>
          <div><strong>Monetisation Plan:</strong> [Plan]</div>
          <div><strong>Compliance Checklist:</strong> [Checklist]</div>
          <div><strong>MVP Roadmap:</strong> [Roadmap]</div>
          <div><strong>Pricing Ladder:</strong> [Pricing]</div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Download PDF (coming soon)</button>
        </div>
      </div>
    </div>
  );
}