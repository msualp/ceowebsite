'use client';

import { useEffect, useState } from 'react';
import { 
  isFeatureSupported, 
  loadPolyfillIfNeeded, 
  POLYFILL_URLS,
  isImageFormatSupported
} from '@/lib/feature-detection';

/**
 * Component that loads necessary polyfills for the website
 * This component should be included in the app layout
 */
export function FeatureDetection() {
  const [polyfillsLoaded, setPolyfillsLoaded] = useState(false);
  const [imageFormatsDetected, setImageFormatsDetected] = useState(false);
  const [webpSupported, setWebpSupported] = useState(false);
  const [avifSupported, setAvifSupported] = useState(false);

  // Load polyfills on mount
  useEffect(() => {
    const loadPolyfills = async () => {
      try {
        // Check for critical features and load polyfills if needed
        const polyfillPromises = [
          loadPolyfillIfNeeded('intersection-observer', POLYFILL_URLS['intersection-observer']),
          loadPolyfillIfNeeded('fetch', POLYFILL_URLS['fetch']),
          loadPolyfillIfNeeded('promise', POLYFILL_URLS['promise']),
        ];

        // Wait for all polyfills to load
        await Promise.all(polyfillPromises);
        
        // Add CSS classes to the document based on feature support
        addFeatureSupportClasses();
        
        setPolyfillsLoaded(true);
      } catch (error) {
        console.error('Error loading polyfills:', error);
      }
    };

    loadPolyfills();
  }, []);

  // Detect image format support
  useEffect(() => {
    const detectImageFormats = async () => {
      try {
        // Check for WebP and AVIF support
        const webpSupport = await isImageFormatSupported('webp');
        const avifSupport = await isImageFormatSupported('avif');
        
        setWebpSupported(webpSupport);
        setAvifSupported(avifSupport);
        
        // Add CSS classes for image format support
        if (webpSupport) {
          document.documentElement.classList.add('webp');
        } else {
          document.documentElement.classList.add('no-webp');
        }
        
        if (avifSupport) {
          document.documentElement.classList.add('avif');
        } else {
          document.documentElement.classList.add('no-avif');
        }
        
        setImageFormatsDetected(true);
      } catch (error) {
        console.error('Error detecting image formats:', error);
      }
    };

    detectImageFormats();
  }, []);

  // Add CSS classes to the document based on feature support
  const addFeatureSupportClasses = () => {
    const features = [
      'css-variables',
      'css-grid',
      'css-flexbox',
      'css-backdrop-filter',
      'intersection-observer',
      'resize-observer',
      'local-storage',
      'session-storage',
      'web-animation',
    ] as const;

    features.forEach((feature) => {
      const supported = isFeatureSupported(feature);
      if (supported) {
        document.documentElement.classList.add(feature);
      } else {
        document.documentElement.classList.add(`no-${feature}`);
      }
    });
  };

  // This component doesn't render anything
  return null;
}

/**
 * Get the appropriate image source based on browser support
 * @param avifSrc The AVIF image source
 * @param webpSrc The WebP image source
 * @param fallbackSrc The fallback image source (e.g., JPEG or PNG)
 * @returns The appropriate image source based on browser support
 */
export function getOptimalImageSrc(
  avifSrc: string,
  webpSrc: string,
  fallbackSrc: string
): string {
  if (typeof window === 'undefined') {
    return fallbackSrc;
  }

  // Check for AVIF support using the CSS class
  if (document.documentElement.classList.contains('avif')) {
    return avifSrc;
  }

  // Check for WebP support using the CSS class
  if (document.documentElement.classList.contains('webp')) {
    return webpSrc;
  }

  // Fallback to JPEG or PNG
  return fallbackSrc;
}

/**
 * Component that renders a picture element with multiple sources based on browser support
 */
export function OptimizedPicture({
  avifSrc,
  webpSrc,
  fallbackSrc,
  alt,
  className,
  width,
  height,
}: {
  avifSrc: string;
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
      />
    </picture>
  );
}
