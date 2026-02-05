"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export default function AiAgentDashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [runs, setRuns] = useState([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [fileError, setFileError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedPaths, setSelectedPaths] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewedFile, setViewedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const observerTarget = useRef(null);

  const loadRuns = async (pageNum = 1, append = false) => {
    if (pageNum === 1) {
      setIsLoadingRuns(true);
    } else {
      setLoadingMore(true);
    }
    try {
      const res = await fetch(`/api/ai-lab/runs?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (append) {
        setRuns((prev) => [...prev, ...data]);
      } else {
        setRuns(data);
      }

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
    setFileError(null);
    try {
      const res = await fetch("/api/ai-lab/repo-tree");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setFileError(err.message);
      setFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    loadRuns(1, false);
    loadFiles();
  }, []);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loadingMore && !isLoadingRuns) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loadingMore, isLoadingRuns],
  );

  useEffect(() => {
    const element = observerTarget.current;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
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

  const toggleSelect = (path) => {
    setSelectedPaths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const removeSelected = (path) => {
    setSelectedPaths((prev) => {
      const newSet = new Set(prev);
      newSet.delete(path);
      return newSet;
    });
  };

  const loadFileContent = async (path) => {
    setViewedFile(path);
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await fetch(
        `/api/ai-lab/file-content?path=${encodeURIComponent(path)}`,
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setFileContent(data.content);
    } catch (err) {
      setContentError(err.message);
    } finally {
      setContentLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fileContent)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const handleRun = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const selectedList = Array.from(selectedPaths);
      const appendText = selectedList.length
        ? `\n\nFocus on these files/folders: ${selectedList.join(", ")}`
        : "";
      const fullPrompt = prompt + appendText;

      const res = await fetch("/api/ai-lab/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to run AI Lab");
      }
      const data = await res.json();
      if (data.success) {
        setPage(1);
        setHasMore(true);
        loadRuns(1, false);
        setSelectedPaths(new Set());
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
      const parts = path.split("/");
      let current = root;
      let currentPath = "";
      parts.forEach((part, i) => {
        currentPath += (currentPath ? "/" : "") + part;
        if (i === parts.length - 1) {
          current.push({ name: part, type: "file", path: currentPath });
        } else {
          let node = map.get(currentPath);
          if (!node) {
            node = {
              name: part,
              type: "folder",
              children: [],
              path: currentPath,
            };
            map.set(currentPath, node);
            current.push(node);
          }
          current = node.children;
        }
      });
    });
    return root;
  };

  const filterTree = (nodes, term) => {
    if (!term) return nodes;
    const lowerTerm = term.toLowerCase();
    return nodes.reduce((acc, node) => {
      if (node.type === "file") {
        if (node.path.toLowerCase().includes(lowerTerm)) {
          acc.push(node);
        }
      } else {
        const filteredChildren = filterTree(node.children, term);
        if (
          filteredChildren.length > 0 ||
          node.path.toLowerCase().includes(lowerTerm)
        ) {
          acc.push({ ...node, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  const treeData = buildTree(files);
  const filteredTreeData = filterTree(treeData, searchTerm);

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (nodes, level = 0) => (
    <ul className={`space-y-0.5 ${level > 0 ? "ml-4" : ""}`}>
      {nodes.map((node) => (
        <li key={node.path}>
          <div className="flex items-center py-1.5 px-2 hover:bg-gray-100 rounded text-sm transition">
            <input
              type="checkbox"
              checked={selectedPaths.has(node.path)}
              onChange={() => toggleSelect(node.path)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {node.type === "folder" ? (
              <>
                <span
                  className="cursor-pointer mr-2 text-gray-400 text-xs"
                  onClick={() => toggleFolder(node.path)}
                >
                  {expandedFolders[node.path] ? "▼" : "▶"}
                </span>
                <span
                  className="font-medium text-gray-700 cursor-pointer"
                  onClick={() => toggleFolder(node.path)}
                >
                  {node.name}/
                </span>
              </>
            ) : (
              <span
                className="text-gray-600 truncate hover:text-blue-600 hover:underline cursor-pointer"
                onClick={() => loadFileContent(node.path)}
              >
                {node.name}
              </span>
            )}
          </div>
          {node.type === "folder" &&
            expandedFolders[node.path] &&
            renderTree(node.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  const getStatusColor = (value) => {
    if (value === 'success' || value === 'READY') return 'text-green-600';
    if (value === 'failure' || value === 'ERROR') return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 md:h-20"></div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-[1600px] mx-auto p-4 md:p-6">
        {/* Collapsible Sidebar */}
        <div
          className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 overflow-hidden flex-shrink-0 ${
            sidebarOpen ? "w-full lg:w-72 xl:w-80" : "w-full lg:w-12"
          }`}
        >
          <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white">
            <h3
              className={`font-semibold text-base transition-all duration-300 whitespace-nowrap overflow-hidden ${!sidebarOpen ? "w-0 opacity-0" : "w-auto opacity-100"}`}
            >
              Project Files
            </h3>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          {sidebarOpen && (
            <div
              className="p-4 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 12rem)" }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search files/folders..."
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {isLoadingFiles ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : fileError ? (
                <p className="text-red-600 text-sm text-center py-4">
                  {fileError}
                </p>
              ) : files.length > 0 ? (
                <>
                  {renderTree(filteredTreeData)}
                  {selectedPaths.size > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-sm mb-2">
                        Selected for Prompt:
                      </h4>
                      <ul className="space-y-1">
                        {Array.from(selectedPaths).map((path) => (
                          <li
                            key={path}
                            className="flex items-center justify-between text-sm text-gray-700 bg-white p-2 rounded"
                          >
                            <span className="truncate">{path}</span>
                            <button
                              onClick={() => removeSelected(path)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic text-sm text-center py-4">
                  No files found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-4 lg:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              AI Coding Agent
            </h1>

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
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-98"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                "Generate Changes"
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
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5">
              Recent Prompts
            </h2>

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
                      className="p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <a
                        href={`/ai-lab/runs/${run.id}`}
                        className="block text-base md:text-lg font-medium text-blue-600 hover:underline break-words"
                      >
                        {run.summary}
                      </a>
                      <p className="text-xs md:text-sm text-gray-600 mt-2">
                        Status: <span className="font-medium">{run.status}</span> •{" "}
                        {new Date(run.created_at).toLocaleString()}
                      </p>

                      <div className="mt-2 text-xs text-gray-500">
                        GitHub CI:{" "}
                        <span className={getStatusColor(run.buildStatuses?.githubCI?.conclusion)}>
                          {run.buildStatuses?.githubCI?.conclusion || 
                           run.buildStatuses?.githubCI?.status || 
                           'unknown'}
                        </span>
                        {run.buildStatuses?.githubCI?.logs && (
                          <> (Error: {run.buildStatuses.githubCI.logs.slice(0, 50)}...)</>
                        )}
                        <br />
                        Vercel Deploy:{" "}
                        <span className={getStatusColor(run.buildStatuses?.vercelDeploy?.status)}>
                          {run.buildStatuses?.vercelDeploy?.status || 'unknown'}
                        </span>
                        {run.buildStatuses?.vercelDeploy?.url && (
                          <a
                            href={run.buildStatuses.vercelDeploy.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-blue-600 hover:underline"
                          >
                            Preview
                          </a>
                        )}
                        {run.buildStatuses?.vercelDeploy?.error && (
                          <> (Error: {run.buildStatuses.vercelDeploy.error.slice(0, 50)}...)</>
                        )}
                      </div>
                    </div>
                  ))}

                {loadingMore && (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}

                <div ref={observerTarget} className="h-4"></div>

                {!hasMore && runs.length > 0 && (
                  <p className="text-center text-gray-500 text-sm py-4">
                    No more prompts to load
                  </p>
                )}
              </div>
            ) : (
              <div className="p-8 md:p-12 bg-white rounded-lg border border-dashed border-gray-300 text-center">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm md:text-base">
                  No prompts yet. Submit your first prompt above.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* File Viewer Panel */}
        {viewedFile && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 w-full lg:w-96 xl:w-[400px] flex-shrink-0 overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base truncate">
                Viewing: {viewedFile}
              </h3>
              <button
                onClick={() => setViewedFile(null)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {contentLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : contentError ? (
              <p className="text-red-600 text-sm">{contentError}</p>
            ) : (
              <>
                <pre className="bg-white p-4 rounded-lg overflow-auto max-h-[calc(100vh-20rem)] text-sm">
                  <code>{fileContent}</code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Copy to Clipboard
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}