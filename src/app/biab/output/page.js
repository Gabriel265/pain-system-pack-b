// src/app/biab/output/page.js
'use client';

import { useEffect, useState } from 'react';

export default function BIABOutput() {
  const [output, setOutput] = useState(null);

  useEffect(() => {
    const storedOutput = localStorage.getItem('biabOutput');
    if (storedOutput) {
      setOutput(JSON.parse(storedOutput));
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    alert('Copied to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biab-output.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!output) return <div>Loading...</div>;

  return (
    <div className='max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-md'>
      <h2 className='text-xl font-bold mb-4'>BIAB Output Pack</h2>
      <div>
        <h3 className='font-bold'>Project Summary</h3>
        <p>{output.businessName} - {output.businessType}</p>
        <h3 className='font-bold'>Target Customer + Offer</h3>
        <p>{output.targetCustomers} - {output.coreOffer}</p>
        <h3 className='font-bold'>MVP Scope (5 features)</h3>
        <p>{output.mvpFeatures}</p>
        <h3 className='font-bold'>Monetisation Plan</h3>
        <p>{output.revenueModel} - {output.pricing}</p>
        <h3 className='font-bold'>Growth Plan (first 30 days)</h3>
        <p>{output.acquisitionChannels}</p>
        <h3 className='font-bold'>Risk & Compliance Notes</h3>
        <p>{output.risks} - {output.complianceNeeds}</p>
        <h3 className='font-bold'>Delivery Spine Stage + Next Actions</h3>
        <p>{output.timelineUrgency}</p>
      </div>
      <div className='flex justify-between mt-4'>
        <button onClick={handleCopy} className='bg-blue-500 text-white p-2 rounded'>Copy Pack</button>
        <button onClick={handleDownload} className='bg-green-500 text-white p-2 rounded'>Download JSON</button>
      </div>
    </div>
  );
}