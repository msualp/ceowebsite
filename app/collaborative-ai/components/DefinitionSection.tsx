'use client';

import React from 'react';

interface DefinitionSectionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
}

/**
 * DefinitionSection component for the Collaborative AI page
 */
export default function DefinitionSection({ className = '', isVisible = true }: DefinitionSectionProps) {
  return (
    <section 
      id="definition" 
      className={`relative py-20 px-4 md:py-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm my-16
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out delay-300 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">What is Collaborative AI?</h2>
        
        <div className="prose dark:prose-invert prose-lg max-w-none mb-12">
          <p>
            <strong className="text-blue-600 dark:text-blue-400">Collaborative AI</strong> represents a fundamental shift in how we think about artificial intelligence—moving from tools we use to partners we work with. Unlike traditional AI systems that simply respond to queries or perform isolated tasks, collaborative AI actively participates in the creative and problem-solving process alongside humans.
          </p>
          
          <p>
            At its core, collaborative AI is characterized by:
          </p>
          
          <ul>
            <li><strong>Context Awareness</strong>: Maintaining understanding across conversations, time, and team dynamics</li>
            <li><strong>Bi-directional Learning</strong>: Both the AI and humans adapt to each other over time</li>
            <li><strong>Complementary Capabilities</strong>: Leveraging the distinct strengths of human and artificial intelligence</li>
            <li><strong>Shared Goals</strong>: Working toward common objectives with aligned incentives</li>
            <li><strong>Seamless Integration</strong>: Fitting naturally into human workflows rather than disrupting them</li>
          </ul>
          
          <p>
            This approach transforms AI from a tool that we direct to accomplish specific tasks into a collaborative partner that contributes its unique capabilities to shared endeavors. The result is a new kind of intelligence—neither purely human nor purely artificial, but a hybrid that achieves outcomes neither could reach alone.
          </p>
        </div>
        
        {/* Key distinctions grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Traditional AI Approaches</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Isolated interactions without persistent context</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Primarily reactive to explicit human requests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Limited ability to understand team dynamics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Separate from existing workflows</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Collaborative AI Approach</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Maintains awareness across conversations and time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Proactively contributes based on context understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Adapts to team dynamics and individual preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Seamlessly integrates with existing collaborative environments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
