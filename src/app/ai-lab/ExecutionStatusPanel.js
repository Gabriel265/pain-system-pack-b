import { useState, useEffect } from 'react';

export default function ExecutionStatusPanel() {
  const [runtimeState, setRuntimeState] = useState({
    run_id: null,
    status: 'NO RUN DETECTED',
    timestamp: null,
  });

  useEffect(() => {
    const fetchRuntimeState = async () => {
      try {
        const res = await fetch('/api/ai-lab/runtime');
        if (!res.ok) throw new Error('Failed to fetch runtime state');
        const data = await res.json();
        setRuntimeState(data);
      } catch (error) {
        console.error('Error fetching runtime state:', error);
      }
    };

    fetchRuntimeState();
  }, []);

  return (
    <div className="execution-status-panel">
      <h3>Execution Status</h3>
      <div><strong>Run ID:</strong> {runtimeState.run_id || 'N/A'}</div>
      <div><strong>Status:</strong> {runtimeState.status}</div>
      <div><strong>Timestamp:</strong> {runtimeState.timestamp || 'N/A'}</div>
    </div>
  );
}
