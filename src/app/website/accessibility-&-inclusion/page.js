'use client';
import React, { useState } from 'react';
import {
  Eye,
  Brain,
  Hand,
  MessageSquare,
  Contrast,
  Type,
  FileText,
  Volume2,
} from 'lucide-react';

export default function AccessibilityPage() {
  const [readingMode, setReadingMode] = useState(false);

  const supportAreas = [
    {
      icon: Eye,
      title: 'Visual accessibility',
      description:
        'High-contrast design, scalable text, screen reader optimisation, and colour-safe UI patterns.',
    },
    {
      icon: Brain,
      title: 'Cognitive accessibility',
      description:
        'Clear navigation, predictable layouts, plain-language content, and reduced visual distraction.',
    },
    {
      icon: Hand,
      title: 'Physical accessibility',
      description:
        'Keyboard-first navigation, accessible touch targets, motion controls, and assistive tech support.',
    },
    {
      icon: MessageSquare,
      title: 'Communication accessibility',
      description:
        'Captions, transcripts, text alternatives, and support for multiple input methods.',
    },
  ];

  const features = [
    {
      icon: Contrast,
      title: 'High-contrast modes',
      description:
        'Designed for low vision and colour sensitivity without breaking layout or branding.',
      status: 'Active',
    },
    {
      icon: Type,
      title: 'Readable typography',
      description:
        'Carefully selected fonts, spacing, and hierarchy for long-form and UI content.',
      status: 'Active',
    },
    {
      icon: FileText,
      title: 'Plain-language content',
      description:
        'Content written clearly from the start. No AI rewriting. No loss of meaning.',
      status: 'Active',
    },
    {
      icon: Volume2,
      title: 'Sign language support',
      description:
        'Integrated video interpretation for key user journeys.',
      status: 'Coming soon',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <div className="h-16 md:h-20" />

      {/* HERO */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          

          <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-6">
            Built for everyone,
            <br className="hidden sm:block" />
            from the ground up
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            TwinAccess is not an add-on or a separate experience. Accessibility is
            embedded into how our platform is designed, written, and built.
          </p>
        </div>
      </section>

      {/* PRINCIPLE */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif font-light mb-6">
              Not a separate site. Not a workaround.
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Many platforms treat accessibility as an afterthought — a checkbox
              or a parallel version of the product.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              TwinAccess is different. Every layout, interaction, and content
              decision is reviewed through an accessibility lens from day one.
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORT AREAS */}
      <section className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-10">
              Accessibility support areas
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {supportAreas.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <Icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-10">
              Current and upcoming features
            </h2>

            <div className="space-y-6">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-6 border-b border-border last:border-0"
                  >
                    <Icon className="w-6 h-6 text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === 'Active'
                              ? 'bg-green-500/10 text-green-600'
                              : 'bg-muted/20 text-muted-foreground'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PLAIN LANGUAGE */}
      <section className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">
                Plain-language reading mode
              </h3>
              <button
                onClick={() => setReadingMode(!readingMode)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  readingMode
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground'
                }`}
              >
                {readingMode ? 'Disable' : 'Enable'}
              </button>
            </div>

            <div
              className={`text-muted-foreground transition ${
                readingMode
                  ? 'text-lg leading-loose'
                  : 'text-base leading-relaxed'
              }`}
            >
              <p className="mb-4">
                {readingMode
                  ? 'This mode uses simple words and short sentences. It removes unnecessary complexity so information is easier to understand.'
                  : 'Plain-language mode improves clarity through careful writing, not automated rewriting. The meaning stays intact.'}
              </p>
              <p>
                {readingMode
                  ? 'Nothing is changed by AI. The content is written this way on purpose.'
                  : 'This ensures consistency, accuracy, and trust across all accessibility modes.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
