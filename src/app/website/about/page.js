
import React from "react";
import AboutSection from "@/components/sections/AboutSection";
import MeetTeam from "@/components/sections/MeetTeam";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
    {/* Header Space */}
      <div className="h-16 md:h-20"></div>
      <AboutSection />
      <MeetTeam />
    </main>
  );
}
