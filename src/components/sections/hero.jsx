'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    { id: 1, label: 'Image 1' },
    { id: 2, label: 'Image 2' },
    { id: 3, label: 'Image 3' },
    { id: 4, label: 'Image 4' },
    { id: 5, label: 'Image 5' },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Space */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-foreground mb-4 md:mb-6 lg:mb-8 tracking-wide leading-tight">
                Heading of Hero sections
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-2 uppercase tracking-wider">
               Subtitle text
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12">
               Paragraph text
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 uppercase tracking-wide">
                CTA Button →
              </button>
            </div>

            {/* Right Column - Unique Shaped Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                
                {/* Decorative Background Shape */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-orange-500 opacity-10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-orange-500 opacity-5 rounded-full blur-3xl"></div>
                </div>

                {/* Main Carousel Container with Unique Shape */}
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-background bg-gray-500">
                  
                  {/* Slides */}
                  <div className="relative w-full h-full">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === currentSlide
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95'
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-gray-500 to-gray-600">
                          <div className="text-center p-6">
                            <div className="text-6xl md:text-8xl mb-4 opacity-50">Image Carousel</div>
                            <p className="text-lg md:text-xl font-light opacity-90">
                              {slide.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentSlide
                            ? 'bg-orange-500 w-8 h-2'
                            : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Decorative Accent Elements */}
                <div className="hidden lg:block absolute -top-8 -right-8 w-24 h-24 border-4 border-orange-500 rounded-full opacity-20"></div>
                <div className="hidden lg:block absolute -bottom-12 -left-12 w-32 h-32 border-4 border-orange-500 rounded-full opacity-20"></div>
                <div className="hidden xl:block absolute top-1/4 -left-16 w-16 h-16 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
              </div>

              {/* Floating Badge */}
              <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 bg-background border-2 border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 shadow-xl">
                <p className="text-sm font-medium text-orange-500 whitespace-nowrap">
                  Floating badge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}