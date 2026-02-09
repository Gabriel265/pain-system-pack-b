// src/app/biab/intake/page.js
"use client";

import { useState, useEffect } from "react";
import BIABWizard from "@/components/BIABWizard";

export default function BIABIntake() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">BIAB Intake Form</h1>
        <BIABWizard />
      </div>
    </div>
  );
}