import { useState, useEffect } from 'react';

export default function ExecutionStatusPanel() {
  const [runtimeState, setRuntimeState] = useState({
    status: 'NO RUN',
    verified: false,
    errors: null,
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
        setRuntimeState((prevState) => ({ ...prevState, errors: error.message }));
      }
    };

    fetchRuntimeState();
  }, []);

  return (
    <div className="execution-status-panel">
      <h3>Execution Status</h3>
      <div><strong>Status:</strong> {runtimeState.status}</div>
      <div><strong>Verified:</strong> {runtimeState.verified ? 'Yes' : 'No'}</div>
      {runtimeState.errors && <div><strong>Errors:</strong> {runtimeState.errors}</div>}
    </div>
  );
}
