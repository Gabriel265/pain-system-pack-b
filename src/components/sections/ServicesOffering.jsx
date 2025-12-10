'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ServicesOffering = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Service One Title',
      description: 'A brief description of this service.',
      fullDescription: 'This is a comprehensive description of Service One. Here you can include detailed information about what this service entails, the benefits it provides, and why customers should choose this option. You can expand this with multiple paragraphs of content.',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      dark: true
    },
    {
      id: 2,
      title: 'Service Two Title',
      description: 'A brief description of this service.',
      fullDescription: 'This is a comprehensive description of Service Two. Here you can include detailed information about what this service entails, the benefits it provides, and why customers should choose this option. You can expand this with multiple paragraphs of content.',
      features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      dark: false
    },
    {
      id: 3,
      title: 'Service Three Title',
      description: 'A brief description of this service.',
      fullDescription: 'This is a comprehensive description of Service Three. Here you can include detailed information about what this service entails, the benefits it provides, and why customers should choose this option. You can expand this with multiple paragraphs of content.',
      features: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      dark: false
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="min-h-screen bg-background text-foreground py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header Section with subtle background */}
          <div className="mb-12 lg:mb-16 relative">
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" />
            
            <div className="relative flex items-start gap-8 lg:gap-16 py-8">
              {/* Vertical Text */}
              <div className="hidden md:block">
                <p className="text-sm tracking-widest text-gray-500 transform -rotate-90 origin-left translate-y-24 whitespace-nowrap">
                  SERVICES
                </p>
              </div>

              {/* Main Heading */}
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                  WE OFFER
                </h1>
                <p className="mt-6 text-sm sm:text-base text-gray-500 max-w-md">
                  These are generic placeholder services. Use these sections to showcase offerings for any type of business or project.
                </p>
              </div>

              {/* All Services Button */}
              <div className="hidden lg:block">
                <Link href="/services">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 shadow-lg shadow-orange-500/20">
                    VIEW ALL SERVICES
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle Divider */}
          <div className="mb-8 lg:mb-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-orange-500/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </div>

          {/* Services Grid with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  service.dark
                    ? 'bg-foreground text-background shadow-xl'
                    : 'bg-background border-2 border-foreground/10 dark:border-foreground/20 hover:border-orange-500/30'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-300" />
                
                <div className="relative p-8 lg:p-10 h-full flex flex-col justify-between min-h-[320px] sm:min-h-[360px]">
                  {/* Icon with decorative circle */}
                  <div className="mb-8 relative">
                    <div className="absolute -inset-2 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">{service.icon}</div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">
                      {service.title}
                    </h3>
                    <p className={`text-sm ${service.dark ? 'text-background/70' : 'text-gray-500'}`}>
                      {service.description}
                    </p>

                    {/* Read More Button */}
                    <button
                      onClick={() => openModal(service)}
                      className="mt-6 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all hover:text-orange-500"
                    >
                      <span>READ MORE</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Mobile All Services Button */}
          <div className="lg:hidden mt-12 text-center">
            <Link href="/services">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 shadow-lg shadow-orange-500/20">
                ALL SERVICES
              </button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="relative bg-background text-foreground rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="p-8 lg:p-12">
              {/* Icon */}
              <div className="mb-6 text-orange-500">
                {selectedService.icon}
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
                {selectedService.title}
              </h2>

              {/* Full description */}
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {selectedService.fullDescription}
              </p>

              {/* Features list */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex gap-4 pt-6 border-t border-foreground/10">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300">
                  Get Started
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-full text-sm font-medium border-2 border-foreground/10 hover:border-foreground/20 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesOffering;