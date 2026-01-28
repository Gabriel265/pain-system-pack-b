// src/app/website/layout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WebsiteLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/website');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/website/about">About</a></li>
            <li><a href="/website/services">Services</a></li>
            <li><a href="/website/projects">Projects</a></li>
            <li><a href="/website/accessibility">Accessibility</a></li>
            <li><a href="/website/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p>&copy; 2023 Pain System</p>
        <p className="hidden md:block">Build version: Development</p>
      </footer>
    </div>
  );
}
