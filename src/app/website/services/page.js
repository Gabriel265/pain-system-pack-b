'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Services Page
 * -------------
 * Purpose:
 * - Displays a clean, card-based list of services
 */
const Services = () => {
  /**
   * Services Data
   * ------------
   *
   * HOW TO EXTEND:
   * - Add new objects to the array
   * - Keep `id` unique
   * - `bgColor` controls per-card visual identity
   */
  const servicesData = [
    {
      id: 1,
      category: 'SERVICE CATEGORY',
      title: 'Title',
      description: 'Description',
      buttonText: 'CONTACT US NOW',
      bgColor: 'bg-[#c4b5a0] dark:bg-[#8b7d6b]'
    },
    {
      id: 2,
      category: 'SERVICE CATEGORY',
      title: 'Title',
      description: 'Description',
      buttonText: 'CONTACT US NOW',
      bgColor: 'bg-[#d4e8e8] dark:bg-[#2a3f3f]'
    },
    {
      id: 3,
      category: 'SERVICE CATEGORY',
      title: 'Title',
      description: 'Description',
      buttonText: 'CONTACT US NOW',
      bgColor: 'bg-[#e8d4d4] dark:bg-[#3f2a2a]'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ===================== Page Hero SECTION ===================== */}
        {/* Header section*/}
        <div className="relative h-[320px] sm:h-[360px] lg:h-[420px] rounded-lg overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <div className="relative h-full flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              SERVICES
            </h1>

            {/* Primary CTA */}
            <Link href="/website/contact">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition-colors">
                CONTACT US NOW
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* ===================== SERVICES GRID ===================== */}
        {/* Responsive two-column grid on medium screens and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              // Card container
              className={`${service.bgColor} rounded-lg transition-transform hover:scale-[1.02] duration-300`}
            >
              {/* Card content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[260px]">
                
                {/* Textual content only */}
                <div className="space-y-4">
                  {/* Category label */}
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-300">
                    {service.category}
                  </p>

                  {/* Service title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {service.title}
                  </h2>

                  {/* Short description */}
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-6">
                  <Link href="/website/contact">
                    <button className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2 hover:gap-3 transition-all">
                      {service.buttonText}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
