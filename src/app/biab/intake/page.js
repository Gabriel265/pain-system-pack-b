// src/app/biab/intake/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BIABIntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    goals: "",
    targetCustomers: "",
    location: "",
    budget: "",
    complianceNeeds: "",
    brandingPreferences: "",
  });
  const router = useRouter();

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Placeholder for form submission
      console.log("Form submitted", formData);
      router.push("/biab/output");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">BIAB Intake Form</h1>
      <div className="mb-4">
        {step === 1 && (
          <input
            type="text"
            name="businessType"
            placeholder="Business Type"
            value={formData.businessType}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}
        {step === 2 && (
          <input
            type="text"
            name="goals"
            placeholder="Goals"
            value={formData.goals}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}
        {/* Add more steps as needed */}
      </div>
      <button onClick={handleNext} className="bg-blue-500 text-white p-2">
        {step < 6 ? "Next" : "Submit"}
      </button>
    </div>
  );
}
