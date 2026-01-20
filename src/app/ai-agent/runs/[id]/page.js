'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function RunDetailPage() {
  const { id } = useParams();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [branchFiles, setBranchFiles] = useState([]);
  const [isLoadingBranchFiles, setIsLoadingBranchFiles] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`/api/agent/runs/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }
        const data = await res.json();
        console.log('Fetched run data:', data); // ← debug
        setRun(data);
      } catch (err) {
        console.error('Fetch run error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadBranchFiles = async () => {
      setIsLoadingBranchFiles(true);
      try {
        const res = await fetch('/api/agent/repo-tree?branch=ai-agent');
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        console.log('ai-agent branch files:', data); // ← debug
        setBranchFiles(data);
      } catch (err) {
        console.error('Branch tree failed:', err);
      } finally {
        setIsLoadingBranchFiles(false);
      }
    };

    fetchRun();
    loadBranchFiles();
  }, [id]);

  // Build tree from flat paths
  const buildTree = (paths) => {
    const root = [];
    const map = new Map();

    paths.forEach(({ path }) => {
      const parts = path.split('/');
      let current = root;
      let currentPath = '';

      parts.forEach((part, i) => {
        currentPath += (currentPath ? '/' : '') + part;
        if (i === parts.length - 1) {
          current.push({ name: part, type: 'file', path: currentPath });
        } else {
          let node = map.get(currentPath);
          if (!node) {
            node = { name: part, type: 'folder', children: [], path: currentPath };
            map.set(currentPath, node);
            current.push(node);
          }
          current = node.children;
        }
      });
    });

    return root;
  };

  const treeData = buildTree(branchFiles);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (nodes, level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'ml-5' : ''}`}>
      {nodes.map((node) => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <div
              className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-gray-100 rounded-md transition"
              onClick={() => toggleFolder(node.path)}
            >
              <span className="mr-2 text-gray-500">{expandedFolders[node.path] ? '▼' : '▶'}</span>
              <span className="font-medium text-gray-800">{node.name}/</span>
            </div>
          ) : (
            <div className="py-1.5 px-2 text-gray-700 truncate hover:text-blue-600 transition">
              {node.name}
            </div>
          )}
          {node.type === 'folder' && expandedFolders[node.path] && renderTree(node.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  const handleAction = async (action) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/agent/${action}/${id}`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      alert(action === 'merge' ? 'Merged successfully!' : 'Discarded successfully');
      window.location.href = '/ai-agent';
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-2xl font-medium">Loading proposal...</div>;
  if (error) return <div className="p-12 text-red-600 text-center text-xl">Error: {error}</div>;
  if (!run) return <div className="p-12 text-center text-xl text-gray-600">Proposal not found or loading failed.</div>;

  return (
    <>
      <div className="h-16 md:h-20"></div>

      <div className="flex gap-8 max-w-7xl mx-auto p-6">
        {/* Sidebar - ai-agent branch tree */}
        <div className="w-80 bg-white border rounded-xl p-6 overflow-y-auto max-h-screen sticky top-6 hidden lg:block shadow-sm">
          <h3 className="font-semibold text-xl mb-5">Files in ai-agent branch</h3>
          {isLoadingBranchFiles ? (
            <p className="text-gray-500">Loading branch files...</p>
          ) : branchFiles.length > 0 ? (
            renderTree(treeData)
          ) : (
            <p className="text-gray-500 italic">No files detected in ai-agent branch yet.</p>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{run.summary}</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Status: <span className="font-semibold text-blue-600">{run.status}</span> • Created {new Date(run.created_at).toLocaleString()}
          </p>
          <p className="mb-10 text-lg leading-relaxed"><strong>Prompt:</strong> {run.prompt}</p>

          <a
            href={run.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-12 px-10 py-5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg"
          >
            Open Preview (See Changes Live)
          </a>

          {run.status === 'Pending' && (
            <div className="mb-12 flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => handleAction('merge')}
                disabled={actionLoading}
                className="flex-1 px-10 py-5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 transition shadow-md"
              >
                {actionLoading ? 'Merging...' : 'Approve & Merge'}
              </button>
              <button
                onClick={() => handleAction('discard')}
                disabled={actionLoading}
                className="flex-1 px-10 py-5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition shadow-md"
              >
                {actionLoading ? 'Discarding...' : 'Discard'}
              </button>
            </div>
          )}

          <h2 className="text-3xl font-semibold mb-8">Code Changes</h2>
          {run.files?.length > 0 ? (
            run.files.map((file, i) => (
              <div key={i} className="mb-12 border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gray-100 px-6 py-4 font-medium text-xl">
                  {file.path} <span className="text-base text-gray-500 ml-3">({file.status})</span>
                </div>
                <pre className="p-6 bg-gray-50 overflow-x-auto text-sm font-mono leading-relaxed">
                  <code>{file.diff}</code>
                </pre>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg italic">No detailed diff available — check preview link above for live changes.</p>
          )}
        </div>
      </div>
    </>
  );
}