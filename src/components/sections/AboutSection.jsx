'use client';
import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="w-full bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-12 sm:mb-16 lg:mb-20">
          ABOUT<br />ME
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* First Text Block */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Professional Solutions for Your Needs
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                We provide reliable, high-quality services tailored to help individuals and businesses reach their goals.
              </p>
            </div>

            {/* Second Text Block */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Focused on Quality & Innovation
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                Our team is dedicated to delivering effective solutions through modern practices, clear communication, and consistent performance.
              </p>
            </div>

            {/* Main Image - Mobile */}
            <div className="lg:hidden rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/800/600"
                alt="Placeholder visual"
                width={800}
                height={600}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Main Image - Desktop */}
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/800/600"
                alt="Placeholder visual"
                width={800}
                height={600}
                className="w-full h-80 xl:h-96 object-cover"
              />
            </div>

            {/* Philosophy Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg transition-colors duration-300">

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                
                {/* Small Image */}
                <div className="w-full sm:w-32 h-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src="https://picsum.photos/200"
                    alt="Placeholder icon"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Our Philosophy
                </h3>
              </div>

              {/* Philosophy Text */}
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                We believe in delivering value through commitment, integrity, and a strong focus on our clients' objectives. Every project matters.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
