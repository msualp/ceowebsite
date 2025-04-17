'use client';

import React from 'react';
import Image from 'next/image';
import { HiUserGroup, HiLightBulb, HiChatBubbleLeftRight } from 'react-icons/hi2';

interface VisionSectionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
}

/**
 * VisionSection component for the Collaborative AI page
 */
export default function VisionSection({ className = '', isVisible = true }: VisionSectionProps) {
  return (
    <section 
      id="vision" 
      className={`relative py-20 px-4 md:py-24
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out delay-300 ${className}`}
    >
      <div className="absolute -left-40 -top-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision for Collaborative AI</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          We envision a future where the boundaries between human and artificial intelligence blur, creating a new paradigm of collaborative intelligence.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <div className="mb-8 md:flex md:items-center md:gap-8">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <Image 
              src="/images/collaborative-intelligence.png" 
              alt="Collaborative Intelligence Concept" 
              width={400} 
              height={400} 
              className="rounded-xl mx-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">From Tools to Partners</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The history of technology has been about creating tools that extend human capabilities. Collaborative AI represents the next evolutionary step—technology that doesn't just extend our capabilities but actively participates in the creative and problem-solving process alongside us.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This shift fundamentally changes how we approach tasks, make decisions, and create new solutions. Rather than simply directing AI to perform specific functions, we engage with it as a collaborative partner with complementary strengths and perspectives.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Key Principles of Our Vision</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                <HiUserGroup className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Human-Centered</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Collaborative AI enhances human capabilities rather than replacing them, putting people at the center of the experience.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4">
                <HiLightBulb className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Contextually Intelligent</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Systems that understand the broader context of work, maintaining awareness across conversations, time, and team dynamics.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                <HiChatBubbleLeftRight className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Naturally Integrated</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Collaborative AI feels like a natural extension of how people already work rather than requiring significant adaptation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
