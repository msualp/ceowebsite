'use client';

import React from 'react';
import Image from 'next/image';

interface QuoteImageProps {
  /** Image source */
  src: string;
  /** Image alt text */
  alt: string;
  /** Quote text */
  quote: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * QuoteImage component for displaying an image with a caption/quote
 */
export default function QuoteImage({
  src = '/images/we-are-all-students.png',
  alt = 'We Are All Students',
  quote = '"We are all students." A mantra I live by as a devoted lifelong learner.',
  className = ''
}: QuoteImageProps) {
  return (
    <div className={`relative mt-16 mb-12 max-w-4xl mx-auto fade-in-scroll ${className}`}>
      <div className="img-with-caption relative rounded-xl overflow-hidden group">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={400}
          className="w-full rounded-xl shadow-md transition-transform duration-700 group-hover:scale-105"
        />
        <div className="caption-reveal absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-0 opacity-80 group-hover:opacity-100 transition-all">
          {quote}
        </div>
      </div>
    </div>
  );
}
