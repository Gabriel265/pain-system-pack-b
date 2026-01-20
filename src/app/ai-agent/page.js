'use client';
import { useState, useEffect } from 'react';

export default function AiAgentDashboard() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [runs, setRuns] = useState([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [files, setFiles] = useState([]);           // File tree state
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});

  const loadRuns = async () => {
    setIsLoadingRuns(true);
    try {
      const res = await fetch('/api/agent/runs');
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRuns(data);
    } catch (err) {
      console.error('Runs load failed:', err);
      setError(err.message);
      setRuns([]);
    } finally {
      setIsLoadingRuns(false);
    }
  };

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const res = await fetch('/api/agent/repo-tree');
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error('File tree failed:', err);
      setFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    loadRuns();
    loadFiles();
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
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to run agent');
      }
      const data = await res.json();
      if (data.success) {
        loadRuns(); // Refresh history
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


   // Build tree structure from flat paths
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
          // File
          current.push({ name: part, type: 'file', path: currentPath });
        } else {
          // Folder
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

  const treeData = buildTree(files);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (nodes, level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {nodes.map((node) => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <div
              className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100 rounded"
              onClick={() => toggleFolder(node.path)}
            >
              <span className="mr-2">{expandedFolders[node.path] ? '▼' : '▶'}</span>
              <span className="font-medium text-gray-800">{node.name}/</span>
            </div>
          ) : (
            <div className="py-1 px-2 text-gray-700 truncate">
              {node.name}
            </div>
          )}
          {node.type === 'folder' && expandedFolders[node.path] && renderTree(node.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  return (

    <>
    {/* Header Space */}
      <div className="h-16 md:h-20"></div>
    <div className="flex gap-6 max-w-7xl mx-auto p-6">
    
        

      {/* Sidebar */}
      <div className="w-80 bg-white border rounded-xl p-5 overflow-y-auto max-h-[85vh] sticky top-6 hidden lg:block shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Project Files (ai-deploy)</h3>
        {isLoadingFiles ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : files.length > 0 ? (
          renderTree(treeData)
        ) : (
          <p className="text-gray-500 italic text-sm">No files found.</p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">AI Coding Agent</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to change (e.g., change header color to white cream in src/components/Header.js)"
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 resize-y shadow-sm"
          disabled={loading}
        />

        <button
          onClick={handleRun}
          disabled={loading || !prompt.trim()}
          className={`px-10 py-4 rounded-lg font-medium text-white shadow-md transition-all ${
            loading || !prompt.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
          }`}
        >
          {loading ? 'Processing...' : 'Generate Changes'}
        </button>

        {error && (
          <div className="mt-6 p-5 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-5">Recent Prompts</h2>

          {isLoadingRuns ? (
            <p className="text-gray-500">Loading recent prompts...</p>
          ) : runs.length > 0 ? (
            <ul className="space-y-4">
              {runs
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((run) => (
                  <li
                    key={run.id}
                    className="p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <a
                      href={`/ai-agent/runs/${run.id}`}
                      className="block text-xl font-medium text-blue-600 hover:underline"
                    >
                      {run.summary}
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      Status: <span className="font-medium">{run.status}</span> • {new Date(run.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="p-8 bg-gray-50 rounded-xl border border-dashed text-center text-gray-500">
              No prompts yet. Submit your first prompt above.
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}