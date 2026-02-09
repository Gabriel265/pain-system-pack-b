// src/components/BIABWizard.js
"use client";

import { useState, useEffect } from "react";

const steps = [
  "Business Name",
  "Business Type",
  "Core Offer",
  "Target Customers",
  "Revenue Model",
  "Competitors",
  "Branding Preferences",
  "Compliance Needs",
  "Platform Requirements",
  "Goals",
  "Budget + Timeline",
  "Final Review Summary",
];

export default function BIABWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(sessionStorage.getItem("biabFormData")) || {};
    }
    return {};
  });

  useEffect(() => {
    sessionStorage.setItem("biabFormData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {steps[currentStep]}
        </label>
        <input
          type="text"
          name={steps[currentStep].toLowerCase().replace(/ /g, "_")}
          value={formData[steps[currentStep].toLowerCase().replace(/ /g, "_")] || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {currentStep === steps.length - 1 ? "Generate BIAB Pack" : "Next"}
        </button>
      </div>
    </div>
  );
}
