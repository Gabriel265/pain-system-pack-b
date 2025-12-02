'use client';
import React from 'react';
import Link from 'next/link';

const services = () => {
  const servicesData = [
    {
      id: 1,
      category: "SERVICE CATEGORY 1",
      title: "Service One Title",
      description: "A brief description of this service.",
      buttonText: "CONTACT US NOW",
      image: "https://picsum.photos/400/400?random=1",
      bgColor: "bg-[#c4b5a0] dark:bg-[#8b7d6b]"
    },
    {
      id: 2,
      category: "SERVICE CATEGORY 2",
      title: "Service Two Title",
      description: "A brief description of this service.",
      buttonText: "CONTACT US NOW",
      image: "https://picsum.photos/400/400?random=2",
      bgColor: "bg-[#d4e8e8] dark:bg-[#2a3f3f]"
    },
    {
      id: 3,
      category: "SERVICE CATEGORY 3",
      title: "Service Three Title",
      description: "A brief description of this service.",
      buttonText: "CONTACT US NOW",
      image: "https://picsum.photos/400/400?random=3",
      bgColor: "bg-[#e8d4d4] dark:bg-[#3f2a2a]"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-lg overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <div className="relative h-full flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 text-center">
              SERVICES
              <br />
              TEMPLATE
            </h1>
            
            <Link href="/contact">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition-colors">
                CONTACT US NOW
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`${service.bgColor} rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300`}
            >
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-center min-h-[280px]">
                {/* Text Content */}
                <div className="flex-1 space-y-4">
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-300">
                    {service.category}
                  </p>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {service.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                  
                  <Link href="/contact">
                    <button className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2 hover:gap-3 transition-all mt-2">
                      {service.buttonText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Image Placeholder */}
                <div className="w-full sm:w-48 lg:w-56 h-48 sm:h-56 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default services;
