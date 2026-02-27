// src/app/ai-lab/page.js
"use client";
import { useState, useEffect, useRef } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', logs: '' });

  const [needsApproval, setNeedsApproval] = useState(false);
  const [pendingDependencies, setPendingDependencies] = useState([]);
  const [originalFullPrompt, setOriginalFullPrompt] = useState("");

  const observerTarget = useRef(null);

  const loadRuns = async (pageNum = 1, append = false) => {
    if (pageNum === 1) setIsLoadingRuns(true);
    else setLoadingMore(true);

    try {
      const res = await fetch(`/api/ai-lab/runs?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (append) setRuns((prev) => [...prev, ...data]);
      else setRuns(data);

      setHasMore(data.length >= 10);
    } catch (err) {
      setError(err.message);
      if (!append) setRuns([]);
    } finally {
      setIsLoadingRuns(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadRuns();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="p-4">
        <label htmlFor="prompt" className="block text-lg font-medium">
          Enter your prompt
        </label>
        <textarea
          id="prompt"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the changes you want..."
        ></textarea>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {/* handle submit */}}
        >
          Submit
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
            <pre className="whitespace-pre-wrap font-mono">{error}</pre>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Recent Prompts</h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {runs.map((run, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded">
                <h3 className="font-medium">{run.title}</h3>
                <p>Status: {run.status}</p>
                <p>CI: {run.ciStatus}</p>
                <p>Deploy: {run.deployStatus}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Files</h2>
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded">
                {file.path}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
