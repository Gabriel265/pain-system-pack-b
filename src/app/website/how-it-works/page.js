// src/app/website/how-it-works/page.js

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">What the Pain System Is</h2>
          <p>The Pain System is a governance-first platform that turns ideas into safe, deployable systems.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">What You Can Do Here (Phase-1)</h2>
          <ul className="list-disc list-inside">
            <li>Explore projects</li>
            <li>Use AI Lab to build pages</li>
            <li>Package ideas into Business in a Box</li>
            <li>Accessibility built-in by default</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">How Things Get Built</h2>
          <p>Idea → Page → System → Governed Output</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">What Comes Later (Coming Later)</h2>
          <ul className="list-disc list-inside">
            <li>Automation</li>
            <li>Advanced AI execution</li>
            <li>Commercial deployment</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Accessibility Commitment</h2>
          <p>Accessibility is embedded from day one.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
