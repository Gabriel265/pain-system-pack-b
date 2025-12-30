'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
  { id: 1, label: 'Build → Launch → Prove → Monetise' },
  { id: 2, label: 'Fast builds. Clean delivery.' },
  { id: 3, label: 'Admin-ready. Client-ready.' },
  { id: 4, label: 'Security + compliance first.' },
  { id: 5, label: 'IP protected by design.' },
];
  

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
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
    <section className="bg-background text-foreground">
      {/* Header Offset */}
      <div className="h-16 md:h-20" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary mb-4">
              Accessibility-first platform
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-light leading-tight mb-6">
              A platform for everyone
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Designed to work for all people, regardless of ability. Not a
              disability-only site — a platform built with accessibility as a
              foundation.
            </p>

            <blockquote className="border-l-2 border-primary pl-4 mb-8">
              <p className="text-sm md:text-base italic text-muted-foreground leading-relaxed">
                “People should not adapt to suit the machine. The machine should
                adapt to suit the person.”
              </p>
            </blockquote>

            {/* CTA placeholder */}
            <button
              className="inline-flex items-center justify-center rounded-full
                         bg-primary text-primary-foreground
                         px-6 py-3 text-sm font-medium
                         hover:opacity-90 transition"
            >
              Get started
            </button>
          </div>

          {/* VISUAL */}
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Soft background accent */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Carousel */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Placeholder visual */}
                  <div className="w-full h-full flex items-center justify-center bg-muted/10">
                    <span className="text-sm text-muted-foreground">
                      {slide.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Controls */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2
                           bg-background/90 border border-border
                           p-2 rounded-full hover:bg-background transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2
                           bg-background/90 border border-border
                           p-2 rounded-full hover:bg-background transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'w-6 bg-primary'
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
