// layout for everything in this folder

"use client";

import { useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function AILabLayout({ children }) {
  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add("ai-lab-active");

    // Cleanup when unmounting
    return () => {
      document.body.classList.remove("ai-lab-active");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-1">
        <Sidebar type="ai-lab" />

        <main className="flex-1 p-4 sm:p-6 lg:p-10" role="main">{children}</main>
      </div>
    </div>
  );
}
