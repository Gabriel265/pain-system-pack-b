'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function RunDetailPage() {
  const { id } = useParams();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`/api/agent/runs/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setRun(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRun();
  }, [id]);

  const handleAction = async (action) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/agent/${action}/${id}`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      alert(action === 'merge' ? 'Merged successfully' : 'Discarded successfully');
      window.location.href = '/ai-agent';
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading proposal...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!run) return <div className="p-8">Proposal not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{run.summary}</h1>
      <p className="text-gray-600 mb-6">
        Status: <span className="font-medium">{run.status}</span> • Created {new Date(run.created_at).toLocaleString()}
      </p>
      <p className="mb-6"><strong>Prompt:</strong> {run.prompt}</p>

      <a
        href={run.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Open Preview Deployment
      </a>

      {run.status === 'Pending' && (
        <div className="mb-10 space-x-4">
          <button
            onClick={() => handleAction('merge')}
            disabled={actionLoading}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {actionLoading ? 'Merging...' : 'Approve & Merge to ai-deploy'}
          </button>
          <button
            onClick={() => handleAction('discard')}
            disabled={actionLoading}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {actionLoading ? 'Discarding...' : 'Discard Changes'}
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Code Changes</h2>
      {run.files?.length > 0 ? (
        run.files.map((file, i) => (
          <div key={i} className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 font-medium">{file.path} ({file.status})</div>
            <pre className="p-4 bg-gray-50 overflow-x-auto text-sm">
              <code>{file.diff}</code>
            </pre>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No detailed diff available yet.</p>
      )}
    </div>
  );
}