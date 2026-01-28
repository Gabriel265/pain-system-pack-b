// src/app/website/page.js
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesPreviewSection from '@/components/sections/ServicesPreviewSection';
import ContactSection from '@/components/sections/ContactSection';

export default function WebsitePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesPreviewSection />
      <ContactSection />
    </div>
  );
}
