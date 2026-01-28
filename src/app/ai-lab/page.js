// src/app/ai-lab/page.js
"use client";
import { useState, useEffect } from "react";

export default function AiAgentDashboard() {
  const [lastRunId, setLastRunId] = useState(null);
  const [status, setStatus] = useState("NEEDS REVIEW");
  const [safeToMerge, setSafeToMerge] = useState("No");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Fetch the latest run data from the server
    const fetchLatestRun = async () => {
      try {
        const res = await fetch("/api/ai-lab/latest-run");
        if (!res.ok) throw new Error("Failed to fetch latest run");
        const data = await res.json();
        setLastRunId(data.id);
        setStatus(data.status);
        setSafeToMerge(data.safeToMerge);
        setTimestamp(data.timestamp);
      } catch (error) {
        console.error("Error fetching latest run:", error);
      }
    };

    fetchLatestRun();
  }, []);

  return (
    <div className="ai-lab-control-panel">
      <h2>AI Lab Control Panel</h2>
      <div>
        <strong>Last Run ID:</strong> {lastRunId || "Loading..."}
      </div>
      <div>
        <strong>Status:</strong> {status}
      </div>
      <div>
        <strong>Safe to Merge:</strong> {safeToMerge}
      </div>
      <div>
        <strong>Timestamp:</strong> {timestamp || "Loading..."}
      </div>
    </div>
  );
}
