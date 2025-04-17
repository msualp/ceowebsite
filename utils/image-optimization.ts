/**
 * Utility functions for image optimization and responsive handling
 * These functions are used to optimize images uploaded through the CMS
 */

import { BlogImage } from '@/types/blog';

/**
 * Generate responsive image variants from a source URL
 * This function works with Uploadcare's image transformation API
 * 
 * @param sourceUrl The original image URL
 * @param alt Alt text for the image
 * @returns A BlogImage object with responsive variants
 */
export function generateResponsiveImage(sourceUrl: string, alt: string): BlogImage {
  // Check if this is an Uploadcare image
  const isUploadcare = sourceUrl.includes('ucarecdn.com');
  
  if (!isUploadcare) {
    // Return basic image object for non-Uploadcare images
    return {
      url: sourceUrl,
      alt: alt || 'Blog image',
    };
  }
  
  // For Uploadcare images, generate responsive variants
  // Base URL without size parameters
  const baseUrl = sourceUrl.split('/-/').shift() || sourceUrl;
  
  // Create responsive variants
  const responsive = {
    small: `${baseUrl}/-/resize/500x/`,
    medium: `${baseUrl}/-/resize/800x/`,
    large: `${baseUrl}/-/resize/1200x/`,
  };
  
  // Create blur data URL for image loading
  const blurDataUrl = `${baseUrl}/-/resize/20x/-/blur/50/`;
  
  return {
    url: sourceUrl,
    alt: alt || 'Blog image',
    responsive,
    blurDataUrl,
  };
}

/**
 * Get appropriate image URL based on screen size
 * 
 * @param image BlogImage object with responsive variants
 * @param size Desired size (small, medium, large)
 * @returns The appropriate image URL
 */
export function getResponsiveImageUrl(image: BlogImage, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!image.responsive) {
    return image.url;
  }
  
  return image.responsive[size] || image.url;
}

/**
 * Format image path from CMS to ensure it works correctly
 * 
 * @param path Image path from CMS
 * @returns Formatted image path
 */
export function formatImagePath(path: string | undefined): string {
  if (!path) return '';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // If it's a relative path starting with /, use as is
  if (path.startsWith('/')) {
    return path;
  }
  
  // Otherwise, add leading slash
  return `/${path}`;
}

/**
 * Extract image dimensions from Uploadcare URL if available
 * 
 * @param url Uploadcare image URL
 * @returns Object with width and height if available
 */
export function extractImageDimensions(url: string): { width?: number; height?: number } {
  if (!url.includes('ucarecdn.com')) {
    return {};
  }
  
  // Try to extract dimensions from URL
  const dimensionsMatch = url.match(/-\/resize\/(\d+)x(\d+)\//);
  if (dimensionsMatch && dimensionsMatch.length >= 3) {
    return {
      width: parseInt(dimensionsMatch[1], 10),
      height: parseInt(dimensionsMatch[2], 10),
    };
  }
  
  return {};
}
