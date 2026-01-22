'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function RunDetailPage() {
  const { id } = useParams();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [branchFiles, setBranchFiles] = useState([]);
  const [isLoadingBranchFiles, setIsLoadingBranchFiles] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`/api/ai-lab/runs/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setRun(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadBranchFiles = async () => {
      setIsLoadingBranchFiles(true);
      try {
        const res = await fetch('/api/ai-lab/repo-tree?branch=ai-lab');
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
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
    <ul className={`space-y-0.5 ${level > 0 ? 'ml-4' : ''}`}>
      {nodes.map((node) => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <div
              className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-gray-100 rounded text-sm transition"
              onClick={() => toggleFolder(node.path)}
            >
              <span className="mr-2 text-gray-400 text-xs flex-shrink-0">
                {expandedFolders[node.path] ? '▼' : '▶'}
              </span>
              <span className="font-medium text-gray-700 truncate">{node.name}/</span>
            </div>
          ) : (
            <div className="py-1.5 px-2 pl-6 text-gray-600 truncate text-sm hover:text-blue-600 hover:bg-gray-50 rounded transition cursor-default">
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
      const res = await fetch(`/api/ai-lab/${action}/${id}`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      alert(action === 'merge' ? 'Merged successfully!' : 'Discarded successfully');
      window.location.href = '/ai-lab';
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-base sm:text-lg font-medium text-gray-700">Loading proposal...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="text-red-600 text-lg sm:text-xl font-semibold mb-2">Error</div>
        <p className="text-sm sm:text-base text-gray-700 break-words">{error}</p>
      </div>
    </div>
  );

  if (!run) return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <p className="text-base sm:text-lg text-gray-600 text-center">Proposal not found or loading failed.</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden flex flex-col">
      <div className="h-16 md:h-20 flex-shrink-0"></div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Collapsible Sidebar */}
        <div
          className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col ${
            sidebarOpen ? 'w-full lg:w-72 xl:w-80' : 'w-full lg:w-12'
          }`}
        >
          <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h3 className={`font-semibold text-base transition-all duration-300 whitespace-nowrap overflow-hidden ${!sidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              ai-lab files
            </h3>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <svg 
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {sidebarOpen && (
            <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
              {isLoadingBranchFiles ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : branchFiles.length > 0 ? (
                renderTree(treeData)
              ) : (
                <p className="text-gray-500 italic text-sm text-center py-4">No files in ai-lab yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col gap-4 lg:gap-6">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 flex-shrink-0">
            <Link 
              href="/ai-lab" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="truncate">Back to Dashboard</span>
            </Link>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-words">
              {run.summary}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-600">
              <span>Status: <span className="font-semibold text-blue-600">{run.status}</span></span>
              <span className="hidden sm:inline">•</span>
              <span className="w-full sm:w-auto">Created {new Date(run.created_at).toLocaleString()}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Prompt:</strong> {run.prompt}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 flex-shrink-0">
            <a
              href={run.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md mb-4"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Preview (See Changes Live)
            </a>

            {run.status === 'Pending' && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => handleAction('merge')}
                  disabled={actionLoading}
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {actionLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Merging...
                    </span>
                  ) : (
                    'Approve & Merge'
                  )}
                </button>
                <button
                  onClick={() => handleAction('discard')}
                  disabled={actionLoading}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {actionLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Discarding...
                    </span>
                  ) : (
                    'Discard'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Code Changes */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-shrink-0 overflow-hidden flex flex-col">
            <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                Code Changes
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="space-y-4 md:space-y-6">
                {run.files?.length > 0 ? (
                  run.files.map((file, i) => (
                    <div key={i} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="font-mono text-sm md:text-base font-medium text-gray-900 break-all">
                            {file.path}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                            {file.status}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-auto max-h-96 w-full">
                        <pre className="p-4 md:p-6 bg-gray-50 text-xs md:text-sm font-mono leading-relaxed min-w-0">
                          <code className="block whitespace-pre">{file.diff}</code>
                        </pre>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 md:py-16">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 text-base md:text-lg italic">
                      No detailed diff available — check preview link above for live changes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}