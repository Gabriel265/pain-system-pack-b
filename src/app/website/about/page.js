'use client';
import React from 'react';
// import Image from 'next/image'; // Removed since we're using placeholders

const AboutSection = () => {
  return (
    <section className="w-full bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    {/* Header Space */}
      <div className="h-16 md:h-20"></div>
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-12 sm:mb-16 lg:mb-20">
          ABOUT<br />Page
        </h1>
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN - TEXT + IMAGE PLACEHOLDER */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* First text block */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Heading
              </h2>
              <p className="text-gray-500  text-sm sm:text-base leading-relaxed">
                Paragraph 
              </p>
            </div>

            {/* Second text block */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Heading
              </h2>
              <p className="text-gray-500  text-sm sm:text-base leading-relaxed">
                Paragraph
              </p>
            </div>

            {/* MOBILE IMAGE PLACEHOLDER */}
            <div className="lg:hidden rounded-2xl overflow-hidden shadow-lg bg-gray-200  h-64 sm:h-80 flex items-center justify-center">
              <span className="text-gray-500  text-sm">
                [Image Placeholder – Mobile View]
              </span>
            </div>
          </div>

          
          {/* RIGHT COLUMN - IMAGE PLACEOLDER + Text block */}
          <div className="space-y-6 lg:space-y-8">
            
            
            {/*  IMAGE PLACEHOLDER */}
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-lg bg-gray-200  h-80 xl:h-96 flex items-center justify-center">
              <span className="text-gray-500  text-sm">
                [Main Image Placeholder – Desktop View]
              </span>
            </div>

            {/* PHILOSOPHY / FEATURE CARD */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100  rounded-2xl p-6 sm:p-8 shadow-lg transition-colors duration-300">

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                
                
                {/* SMALL IMAGE PLACEHOLDER */}
                
                <div className="w-full sm:w-32 h-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-300  shadow-md flex items-center justify-center">
                  <span className="text-gray-500  text-xs text-center px-2">
                    [Image Placeholder]
                  </span>
                </div>

                {/* Card heading */}
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Heading
                </h3>
              </div>

              {/* Card description */}
              <p className="text-gray-500  text-sm sm:text-base leading-relaxed">
                Paragraph
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;