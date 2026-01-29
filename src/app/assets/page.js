// src/app/assets/page.js

export default function AssetsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold">Logo Slot</h2>
          <p className="text-gray-600">Example logo asset description.</p>
        </div>
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold">Video Slot</h2>
          <p className="text-gray-600">Example video asset description.</p>
        </div>
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold">Document Slot</h2>
          <p className="text-gray-600">Example document asset description.</p>
        </div>
      </div>
    </div>
  );
}
