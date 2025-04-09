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
  backgroundImage = '/images/backgrounds/starry-sky.jpg',
  children,
  height = 'h-[50vh]',
  overlayOpacity = 'bg-black/40',
  blurAmount = 'backdrop-blur-sm'
}: HeroSectionProps) {
  return (
    <div
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
  backgroundImage = '/images/backgrounds/starry-sky.jpg',
  height = 'h-56',
  overlayOpacity = 'bg-black/30',
  blurAmount = 'backdrop-blur-sm'
}: {
  backgroundImage?: string;
  height?: string;
  overlayOpacity?: string;
  blurAmount?: string;
}) {
  return (
    <div className={`relative ${height} my-16 overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Section divider"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay with blur effect */}
      <div className={`absolute inset-0 z-10 ${overlayOpacity} ${blurAmount}`} />
    </div>
  );
}
