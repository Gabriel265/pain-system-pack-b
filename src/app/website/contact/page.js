
import React from "react";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
    {/* Header Space */}
      <div className="h-16 md:h-20"></div>
      <ContactSection />
    </main>
  );
}
