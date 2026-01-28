import { useState, useEffect } from 'react';

export default function ExecutionStatusPanel() {
  const [runtimeState, setRuntimeState] = useState({
    status: 'NO RUN',
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
      <div><strong>Status:</strong> {runtimeState.status}</div>
    </div>
  );
}
