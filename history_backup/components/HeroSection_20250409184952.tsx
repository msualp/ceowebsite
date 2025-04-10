'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  height?: string;
  overlayOpacity?: string;
  blurAmount?: string;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage = '/images/hero-bg.jpg',
  children,
  height = 'h-[50vh]',
  overlayOpacity = 'bg-black/50',
  blurAmount = 'backdrop-blur-sm'
}: HeroSectionProps) {
  return (
    <div
      className={`relative ${height} flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            priority
            className="object-cover opacity-70" // Added opacity to blend with gradient
            sizes="100vw"
            onError={(e) => {
              // Hide the image on error and let the gradient show
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Overlay with blur effect */}
      <div className={`absolute inset-0 z-10 ${overlayOpacity} ${blurAmount}`} />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}

export function SectionDivider({
  backgroundImage = '/images/section-divider.jpg', // Changed to a more generic name
  height = 'h-56',
  overlayOpacity = 'bg-black/50', // Reduced opacity to show more of the background
  blurAmount = 'backdrop-blur-sm'
}: {
  backgroundImage?: string;
  height?: string;
  overlayOpacity?: string;
  blurAmount?: string;
}) {
  return (
    <div className={`relative ${height} my-16 overflow-hidden bg-gradient-to-r from-blue-900 to-gray-900`}> {/* Added gradient as fallback */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Section divider"
          fill
          className="object-cover opacity-70" // Added opacity to blend with gradient
          sizes="100vw"
          onError={(e) => {
            // Hide the image on error and let the gradient show
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Overlay with blur effect */}
      <div className={`absolute inset-0 z-10 ${overlayOpacity} ${blurAmount}`} />
    </div>
  );
}
