"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Highlight, themes } from "prism-react-renderer";

const theme = themes.dracula;

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
  const [verdict, setVerdict] = useState({
    status: "NEEDS REVIEW",
    checklist: ["Code syntax checked", "No security issues found"],
    safeToMerge: "No",
  });

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`/api/ai-lab/runs/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setRun(data);
      } catch (err) {
        console.error("Fetch run error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadBranchFiles = async () => {
      setIsLoadingBranchFiles(true);
      try {
        const res = await fetch("/api/ai-lab/repo-tree?branch=ai-lab");
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setBranchFiles(data);
      } catch (err) {
        console.error("Branch tree failed:", err);
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
    paths.forEach((path) => {
      const parts = path.split("/");
      let current = root;
      parts.forEach((part, index) => {
        if (!map.has(part)) {
          const node = {
            name: part,
            children: [],
            path: parts.slice(0, index + 1).join("/"),
          };
          map.set(part, node);
          current.push(node);
        }
        current = map.get(part).children;
      });
    });
    return root;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-1">
        <Sidebar type="ai-lab" />

        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <h1>Run Details</h1>
              <p>Status: {verdict.status}</p>
              <ul>
                {verdict.checklist.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>Safe to merge: {verdict.safeToMerge}</p>
              {/* Existing code for displaying run details */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
