'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HiArrowLongRight, HiAcademicCap, HiDocumentText, HiChatBubbleLeftRight } from 'react-icons/hi2';

interface CollaborationSectionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
}

/**
 * CollaborationSection component for displaying collaboration opportunities
 */
export default function CollaborationSection({ className = '', isVisible = true }: CollaborationSectionProps) {
  return (
    <section 
      id="collaboration" 
      className={`relative py-20 px-4 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-16
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out delay-300 ${className}`}
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 clip-circle transform -translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Collaborate With Us</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our community of researchers, practitioners, and enthusiasts exploring the frontier of Collaborative AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
            <HiAcademicCap className="w-8 h-8 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Research Partnerships</h3>
            <p className="text-blue-100 mb-4">
              Collaborate with us on cutting-edge research in Collaborative AI. We welcome academic and industry partnerships.
            </p>
            <Link 
              href="/contact#research" 
              className="text-white font-medium hover:text-blue-200 inline-flex items-center"
            >
              Learn more
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
            <HiDocumentText className="w-8 h-8 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Join Our Newsletter</h3>
            <p className="text-blue-100 mb-4">
              Stay updated with the latest developments, research findings, and events in the Collaborative AI space.
            </p>
            <Link 
              href="#newsletter" 
              className="text-white font-medium hover:text-blue-200 inline-flex items-center"
            >
              Subscribe
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
            <HiChatBubbleLeftRight className="w-8 h-8 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Speaking Engagements</h3>
            <p className="text-blue-100 mb-4">
              Invite Mustafa Sualp to speak about Collaborative AI at your conference, event, or organization.
            </p>
            <Link 
              href="/contact#speaking" 
              className="text-white font-medium hover:text-blue-200 inline-flex items-center"
            >
              Request speaking
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
