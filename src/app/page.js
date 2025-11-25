import Hero from "@/components/sections/Hero";  
import ServicesOffering from "@/components/sections/ServicesOffering";
import AboutSection from "@/components/sections/AboutSection";
import MeetTeam from "@/components/sections/MeetTeam";
import ContactSection from "@/components/sections/ContactSection";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOffering />
      <AboutSection />
      <MeetTeam />
      <Testimonials />
      <ContactSection />
    </>
  );
}