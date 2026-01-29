// src/components/common/Footer.jsx

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    highContrast: false,
    largeText: false,
    simpleMode: false,
  });

  const toggleOption = (option) => {
    setAccessibilityOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">Home</Link>
          <Link href="/about" className="ml-4">About</Link>
          <Link href="/contact" className="ml-4">Contact</Link>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Accessibility Preview:</span>
          <button
            className={`px-2 py-1 mx-1 ${accessibilityOptions.highContrast ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => toggleOption('highContrast')}
          >
            Contrast
          </button>
          <button
            className={`px-2 py-1 mx-1 ${accessibilityOptions.largeText ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => toggleOption('largeText')}
          >
            Text Size
          </button>
          <button
            className={`px-2 py-1 mx-1 ${accessibilityOptions.simpleMode ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => toggleOption('simpleMode')}
          >
            Simple Mode
          </button>
        </div>
      </div>
    </footer>
  );
}
