import React from 'react';
import HeroSection from './HeroSection';
import AvaSection from './AvaSection';
import BIABPreview from './BIABPreview';

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <AvaSection />
      <BIABPreview />
      {/* Other sections */}
    </div>
  );
}
