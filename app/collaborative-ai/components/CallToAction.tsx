'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

interface CallToActionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Custom title (optional) */
  title?: string;
  /** Custom description (optional) */
  description?: string;
  /** Custom button text (optional) */
  buttonText?: string;
  /** Custom button link (optional) */
  buttonLink?: string;
}

/**
 * CallToAction component for the Collaborative AI page
 */
export default function CallToAction({ 
  className = '',
  title = "Ready to Explore the Future of Collaboration?",
  description = "Connect with us to discuss research opportunities, partnerships, or to learn more about our work in Collaborative AI.",
  buttonText = "Get in Touch",
  buttonLink = "/contact"
}: CallToActionProps) {
  return (
    <section className={`text-center mb-16 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <Link 
        href={buttonLink} 
        className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md inline-flex items-center"
      >
        {buttonText}
        <HiArrowLongRight className="ml-2 w-5 h-5" />
      </Link>
    </section>
  );
}
