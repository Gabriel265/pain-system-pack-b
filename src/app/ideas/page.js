// src/app/ideas/page.js

export default function IdeasPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Internal Workspace – Not Public</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <h2 className="text-xl font-semibold">Idea Slot {slot}</h2>
            <p className="text-gray-600">Placeholder content for Idea Slot {slot}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
