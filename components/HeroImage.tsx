'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { initImageHoverEffects } from '@/lib/animation-utils';

interface HeroImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
}

export default function HeroImage({
  src,
  alt,
  caption,
  priority = false,
  objectPosition = 'center',
  className = ''
}: HeroImageProps) {
  // Initialize hover effects
  useEffect(() => {
    initImageHoverEffects();
  }, []);

  return (
    <div className="group relative rounded-xl overflow-hidden h-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`img-grayscale object-cover ${className}`}
        style={{ objectPosition }}
      />
      {caption && (
        <div className="caption-reveal">
          {caption}
        </div>
      )}
    </div>
  );
}
