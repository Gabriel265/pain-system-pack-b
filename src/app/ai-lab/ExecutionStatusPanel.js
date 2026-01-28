import { useState, useEffect } from 'react';

export default function ExecutionStatusPanel({ lastInstruction, status, timestamp, safeToMerge }) {
  return (
    <div className="execution-status-panel">
      <h3>Execution Status</h3>
      <div><strong>Last Instruction:</strong> {lastInstruction}</div>
      <div><strong>Status:</strong> {status}</div>
      <div><strong>Timestamp:</strong> {timestamp}</div>
      <div><strong>Safe to Merge:</strong> {safeToMerge}</div>
    </div>
  );
}
