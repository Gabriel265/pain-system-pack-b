// src/app/website/page.js

import PublicWebsite from '@/components/sections/PublicWebsite';
import ProjectsShowroom from '@/components/sections/ProjectsShowroom';
import AvaGuide from '@/components/sections/AvaGuide';
import BusinessExplainer from '@/components/sections/BusinessExplainer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <PublicWebsite />
      <ProjectsShowroom />
      <AvaGuide />
      <BusinessExplainer />
    </div>
  );
}
