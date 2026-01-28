// src/app/website/homepage.js

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesPreviewSection from '@/components/sections/ServicesPreviewSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Homepage() {
  return (
    <div className="homepage">
      <HeroSection />
      <AboutSection />
      <ServicesPreviewSection />
      <ContactSection />
    </div>
  );
}
