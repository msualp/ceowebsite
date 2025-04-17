'use client';

import React from 'react';
import Image from 'next/image';
import { BlobShape } from '@/components/SvgShapes';

interface HeroSectionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
}

/**
 * HeroSection component for the Collaborative AI page
 */
export default function HeroSection({ className = '', isVisible = true }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className={`relative pt-16 pb-20 px-4 md:pt-20 md:pb-24 text-center overflow-hidden
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out ${className}`}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-0 text-blue-200 dark:text-blue-900/30 opacity-20 pointer-events-none transform rotate-12">
        <BlobShape className="w-[250px] h-[250px]" />
      </div>
      <div className="absolute bottom-1/4 right-0 text-purple-200 dark:text-purple-900/30 opacity-20 pointer-events-none transform -rotate-12">
        <BlobShape className="w-[250px] h-[250px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          The Future of Human-AI Partnership
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Collaborative AI
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Pioneering the next frontier in human-AI collaboration—where artificial intelligence becomes a true partner in creative and problem-solving endeavors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="#research-topics" 
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            Explore Research Topics
          </a>
          <a 
            href="#collaboration" 
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            Collaborate With Us
          </a>
        </div>
        
        {/* Featured image */}
        <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-xl">
          <Image 
            src="/images/collaborative-ai-hero.png" 
            alt="Collaborative AI Concept" 
            width={1200} 
            height={600}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
            <p className="text-sm md:text-base max-w-2xl">
              From EdTech Pioneer to AI Collaboration Visionary: My journey has always been driven by a passion for innovations that unlock human potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
