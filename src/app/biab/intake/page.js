// src/app/biab/intake/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BIABIntake() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    location: '',
    targetCustomers: '',
    coreOffer: '',
    problemSolved: '',
    differentiator: '',
    revenueModel: '',
    pricing: '',
    acquisitionChannels: '',
    competitors: '',
    complianceNeeds: '',
    dataPrivacyNotes: '',
    risks: '',
    timelineUrgency: '',
    mvpFeatures: '',
    adminNeeds: '',
    integrations: '',
    budgetRange: ''
  });

  const router = useRouter();

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      localStorage.setItem('biabOutput', JSON.stringify(formData));
      router.push('/biab/output');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-md'>
      <h2 className='text-xl font-bold mb-4'>Step {step} of 5</h2>
      <form>
        {step === 1 && (
          <div>
            <input name='businessName' value={formData.businessName} onChange={handleChange} placeholder='Business Name' required />
            <input name='businessType' value={formData.businessType} onChange={handleChange} placeholder='Business Type' required />
            <input name='ownerName' value={formData.ownerName} onChange={handleChange} placeholder='Owner/Client Name' required />
            <input name='location' value={formData.location} onChange={handleChange} placeholder='Location' required />
          </div>
        )}
        {step === 2 && (
          <div>
            <input name='targetCustomers' value={formData.targetCustomers} onChange={handleChange} placeholder='Target Customers' required />
            <input name='coreOffer' value={formData.coreOffer} onChange={handleChange} placeholder='Core Offer' required />
            <input name='problemSolved' value={formData.problemSolved} onChange={handleChange} placeholder='Problem Solved' required />
            <input name='differentiator' value={formData.differentiator} onChange={handleChange} placeholder='Differentiator' required />
          </div>
        )}
        {step === 3 && (
          <div>
            <input name='revenueModel' value={formData.revenueModel} onChange={handleChange} placeholder='Revenue Model' required />
            <input name='pricing' value={formData.pricing} onChange={handleChange} placeholder='Pricing' required />
            <input name='acquisitionChannels' value={formData.acquisitionChannels} onChange={handleChange} placeholder='Acquisition Channels' required />
            <input name='competitors' value={formData.competitors} onChange={handleChange} placeholder='Competitors' required />
          </div>
        )}
        {step === 4 && (
          <div>
            <input name='complianceNeeds' value={formData.complianceNeeds} onChange={handleChange} placeholder='Compliance Needs' required />
            <input name='dataPrivacyNotes' value={formData.dataPrivacyNotes} onChange={handleChange} placeholder='Data/Privacy Notes' required />
            <input name='risks' value={formData.risks} onChange={handleChange} placeholder='Risks' required />
            <input name='timelineUrgency' value={formData.timelineUrgency} onChange={handleChange} placeholder='Timeline/Urgency' required />
          </div>
        )}
        {step === 5 && (
          <div>
            <input name='mvpFeatures' value={formData.mvpFeatures} onChange={handleChange} placeholder='MVP Features (Top 5)' required />
            <input name='adminNeeds' value={formData.adminNeeds} onChange={handleChange} placeholder='Admin Needs' required />
            <input name='integrations' value={formData.integrations} onChange={handleChange} placeholder='Integrations' required />
            <input name='budgetRange' value={formData.budgetRange} onChange={handleChange} placeholder='Budget Range' required />
          </div>
        )}
        <div className='flex justify-between mt-4'>
          <button type='button' onClick={handleBack} disabled={step === 1} className='bg-gray-300 p-2 rounded'>Back</button>
          <button type='button' onClick={handleNext} className='bg-blue-500 text-white p-2 rounded'>
            {step < 5 ? 'Next' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}