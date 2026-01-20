'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function AiAgentDashboard() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [runs, setRuns] = useState([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const observerTarget = useRef(null);

  const loadRuns = async (pageNum = 1, append = false) => {
    if (pageNum === 1) {
      setIsLoadingRuns(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const res = await fetch(`/api/agent/runs?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      
      if (append) {
        setRuns(prev => [...prev, ...data]);
      } else {
        setRuns(data);
      }
      
      // If we received fewer items than the limit, we've reached the end
      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
      if (!append) setRuns([]);
    } finally {
      setIsLoadingRuns(false);
      setLoadingMore(false);
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
      setFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    loadRuns(1, false);
    loadFiles();
  }, []);

  // Infinite scroll observer
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loadingMore && !isLoadingRuns) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loadingMore, isLoadingRuns]);

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0.5 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (page > 1) {
      loadRuns(page, true);
    }
  }, [page]);

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
        setPage(1);
        setHasMore(true);
        loadRuns(1, false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const treeData = buildTree(files);

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
              <span className="mr-2 text-gray-400 text-xs">
                {expandedFolders[node.path] ? '▼' : '▶'}
              </span>
              <span className="font-medium text-gray-700">{node.name}/</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 md:h-20"></div>
      
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-[1600px] mx-auto p-4 md:p-6">
        {/* Collapsible Sidebar */}
        <div
          className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 overflow-hidden flex-shrink-0 ${
            sidebarOpen ? 'w-full lg:w-72 xl:w-80' : 'w-full lg:w-12'
          }`}
        >
          <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-gray-50">
            <h3 className={`font-semibold text-base transition-all duration-300 whitespace-nowrap overflow-hidden ${!sidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Project Files
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
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
              {isLoadingFiles ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : files.length > 0 ? (
                renderTree(treeData)
              ) : (
                <p className="text-gray-500 italic text-sm text-center py-4">No files found.</p>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-4 lg:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">AI Coding Agent</h1>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to change (e.g., change header color to white cream in src/components/Header.js)"
              className="w-full h-40 md:h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-6 resize-y shadow-sm text-sm md:text-base"
              disabled={loading}
            />

            <button
              onClick={handleRun}
              disabled={loading || !prompt.trim()}
              className={`w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-lg font-medium text-white shadow-md transition-all ${
                loading || !prompt.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                'Generate Changes'
              )}
            </button>

            {error && (
              <div className="mt-4 md:mt-6 p-4 md:p-5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm md:text-base">
                {error}
              </div>
            )}
          </div>

          {/* Recent Prompts Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5">Recent Prompts</h2>

            {isLoadingRuns ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : runs.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {runs
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((run) => (
                    <div
                      key={run.id}
                      className="p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <a
                        href={`/ai-agent/runs/${run.id}`}
                        className="block text-base md:text-lg font-medium text-blue-600 hover:underline break-words"
                      >
                        {run.summary}
                      </a>
                      <p className="text-xs md:text-sm text-gray-600 mt-2">
                        Status: <span className="font-medium">{run.status}</span> • {new Date(run.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                
                {/* Infinite scroll loading indicator */}
                {loadingMore && (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}
                
                {/* Intersection observer target */}
                <div ref={observerTarget} className="h-4"></div>
                
                {/* End of list indicator */}
                {!hasMore && runs.length > 0 && (
                  <p className="text-center text-gray-500 text-sm py-4">No more prompts to load</p>
                )}
              </div>
            ) : (
              <div className="p-8 md:p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-sm md:text-base">No prompts yet. Submit your first prompt above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}