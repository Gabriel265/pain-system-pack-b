// src/app/website/tools/page.js

export default function ToolsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pain System Tools</h1>
      <p className="mb-6">Explore the tools offered by the Pain System. These tools are designed to enhance your experience and provide valuable insights. Stay tuned as we bring these tools online.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Tool Example – Coming Online</h2>
          <p className="mt-2">This tool will soon be available to help you with your tasks.</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Tool Example – Coming Online</h2>
          <p className="mt-2">This tool will soon be available to help you with your tasks.</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Tool Example – Coming Online</h2>
          <p className="mt-2">This tool will soon be available to help you with your tasks.</p>
        </div>
      </div>
    </div>
  );
}
