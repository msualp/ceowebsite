'use client';

import React from 'react';
import Image from 'next/image';
import { BlogImage } from '@/types/blog';
import { generateResponsiveImage, formatImagePath } from '@/utils/image-optimization';

export interface ResponsiveImageProps {
  /** Image source URL or BlogImage object */
  src: string | BlogImage;
  /** Alt text for the image */
  alt?: string;
  /** Optional width in pixels */
  width?: number;
  /** Optional height in pixels */
  height?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to fill the container */
  fill?: boolean;
  /** Optional priority loading */
  priority?: boolean;
  /** Optional loading strategy (eager, lazy) */
  loading?: 'eager' | 'lazy';
  /** Optional object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Optional object position */
  objectPosition?: string;
  /** Optional caption */
  caption?: string;
  /** Optional threshold for intersection observer (0-1) */
  threshold?: number;
  /** Optional fallback image path if loading fails */
  fallbackSrc?: string;
  /** Optional class to override the shape-based fallback */
  fallbackShapeClass?: string;
  /** Optional sizes attribute for responsive images */
  sizes?: string;
}

/**
 * ResponsiveImage component for blog images
 * Handles both regular images and Uploadcare optimized images
 * Implements lazy loading for improved performance
 */
export default function ResponsiveImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  loading,
  objectFit = 'cover',
  objectPosition = 'center',
  caption,
  threshold = 0.1,
  fallbackSrc = '/images/sociail-logo-and-background.png',
  fallbackShapeClass,
  sizes,
}: ResponsiveImageProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const imgRef = React.useRef<HTMLDivElement>(null);

  // Set up intersection observer for lazy loading
  React.useEffect(() => {
    // If priority is true, we don't need to observe
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the image enters the viewport, set it as visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        root: null, // Use the viewport as root
        rootMargin: '200px', // Start loading 200px before it enters viewport
        threshold: threshold // Trigger when this percentage is visible
      }
    );

    // Start observing the image container
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, threshold]);

  // Process the image source
  const imageData = typeof src === 'string'
    ? generateResponsiveImage(formatImagePath(src), alt)
    : src;
  
  // Extract image URL and properties
  const { url, alt: imageAlt, blurDataUrl } = imageData;
  const finalAlt = alt || imageAlt || 'Blog image';
  const getShapeClassForAlt = (altText: string): string => {
    const alt = altText.toLowerCase();
    if (alt.includes('ai') || alt.includes('collaboration')) return 'shape-polygon-ai';
    if (alt.includes('product')) return 'shape-circle-product';
    if (alt.includes('entrepreneur')) return 'shape-zigzag-entre';
    return 'shape-hex-default';
  };
  
  // Use fallback image if the source image doesn't exist
  const finalSrc = imgError ? fallbackSrc : url;
  
  // Set up image props
  const imageProps: any = {
    src: finalSrc,
    onError: () => setImgError(true),
    alt: finalAlt,
    className: `${className} ${objectFit ? `object-${objectFit}` : ''}`,
    style: { objectPosition },
    priority,
    loading: priority ? 'eager' : loading || 'lazy',
  };
  
  // Add dimensions if provided or if fill is false
  if (!fill) {
    imageProps.width = width || 800;
    imageProps.height = height || 450;
  } else {
    imageProps.fill = true;
  }
  
  // Add blur placeholder if available
  if (blurDataUrl) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = blurDataUrl;
  }
  
  // Add sizes attribute if provided
  if (sizes) {
    imageProps.sizes = sizes;
  }
  
  return (
    <div className="relative" ref={imgRef}>
      {/* Only render the image when it's visible or priority is true */}
      {(isVisible || priority) && !imgError ? (
        <Image {...imageProps} />
      ) : imgError ? (
        <div className={fallbackShapeClass || getShapeClassForAlt(finalAlt)} aria-hidden="true" />
      ) : null}
      
      {caption && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
          {caption}
        </div>
      )}
    </div>
  );
}
