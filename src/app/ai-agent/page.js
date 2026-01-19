'use client';
import { useState, useEffect } from 'react';

export default function AiAgentDashboard() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [runs, setRuns] = useState([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);

  const loadRuns = async () => {
    setIsLoadingRuns(true);
    try {
      const res = await fetch('/api/agent/runs');
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRuns(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setRuns([]);
    } finally {
      setIsLoadingRuns(false);
    }
  };

  useEffect(() => {
    loadRuns();
  }, []);

  const handleRun = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to run agent');
      }
      const data = await res.json();
      if (data.success) {
        loadRuns();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Coding Agent</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to change (e.g. Add dark mode toggle to navbar)"
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-y"
        disabled={loading}
      />

      <button
        onClick={handleRun}
        disabled={loading || !prompt.trim()}
        className={`px-8 py-3 rounded-lg font-medium text-white ${
          loading || !prompt.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Generate Changes'}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Proposals</h2>

        {isLoadingRuns ? (
          <p className="text-gray-500">Loading...</p>
        ) : runs.length > 0 ? (
          <ul className="space-y-4">
            {runs
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((run) => (
                <li
                  key={run.id}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <a
                    href={`/ai-agent/runs/${run.id}`}
                    className="block text-lg font-medium text-blue-600 hover:underline"
                  >
                    {run.summary} — {run.status}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(run.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No proposals yet. Try your first prompt above.</p>
        )}
      </div>
    </div>
  );
}