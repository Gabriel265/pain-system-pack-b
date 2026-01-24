'use client';

import { useState } from 'react';

export default function ContactSection() {
  /**
   * Form state
   * Keep keys generic so backend/API mapping stays flexible
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  /**
   * UI feedback state
   * Controls temporary notification after submit
   */
  const [showToast, setShowToast] = useState(false);

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary feedback for user action
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Reset form after submit
    setFormData({ name: '', email: '', message: '' });
  };

  /**
   * Generic input handler
   * Relies on `name` attribute matching state keys
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="min-h-screen bg-white transition-colors duration-300">
      {/* 
        Toast / Notification
        Used only for UX feedback, not validation
      */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg animate-slideIn">
          <p className="text-sm font-medium">Submission received</p>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* 
            LEFT COLUMN — STRUCTURAL PLACEHOLDER
            Can be replaced later with media, illustration, map, or removed entirely
          */}
          <div className="hidden lg:block h-[500px] rounded-2xl border border-dashed border-gray-400 dark:border-gray-700 flex items-center justify-center">
            <span className="text-sm text-gray-500">
              Visual placeholder
            </span>
          </div>

          {/* 
            RIGHT COLUMN — FORM CONTAINER
            This is the primary interactive area
          */}
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-800 mb-6">
                Contact Section
              </h2>

              {/* 
                Static contact placeholders
                Replace or remove depending on data source
              */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Label
                  </p>
                  <p className="text-gray-800">Placeholder value</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Label
                  </p>
                  <p className="text-gray-800">Placeholder value</p>
                </div>
              </div>
            </div>

            {/* 
              FORM FIELDS
              Controlled inputs for predictable state flow
            */}
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Text input"
                className="w-full px-5 py-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email input"
                className="w-full px-5 py-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Textarea input"
                rows={6}
                className="w-full px-5 py-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 resize-none"
                required
              />

              {/* 
                Submit action
                Button only triggers handler — no implicit form submit
              */}
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-transform hover:scale-105"
              >
                Action
              </button>
            </div>

            {/* 
              Secondary information block
              Can be repurposed for links, metadata, or removed
            */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Label
                </p>
                <p className="text-gray-800">Placeholder</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Label
                </p>
                <p className="text-gray-800">Placeholder</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Label
                </p>
                <p className="text-gray-800">Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Local animation
        Scoped to component to avoid global CSS pollution
      */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
