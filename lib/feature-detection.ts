/**
 * Feature Detection Utilities
 * 
 * This file provides utilities for detecting browser support for various features
 * and providing fallbacks when necessary.
 */

/**
 * Check if a feature is supported in the current browser
 * @param feature The feature to check
 * @returns True if the feature is supported, false otherwise
 */
export function isFeatureSupported(feature: Feature): boolean {
  // Only run in browser environment
  if (typeof window === 'undefined') {
    return false;
  }

  switch (feature) {
    case 'css-variables':
      return window.CSS && window.CSS.supports && window.CSS.supports('--a', '0');
    
    case 'css-grid':
      return window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');
    
    case 'css-flexbox':
      return window.CSS && window.CSS.supports && window.CSS.supports('display', 'flex');
    
    case 'css-backdrop-filter':
      return window.CSS && window.CSS.supports && window.CSS.supports('backdrop-filter', 'blur(10px)');
    
    case 'intersection-observer':
      return 'IntersectionObserver' in window;
    
    case 'resize-observer':
      return 'ResizeObserver' in window;
    
    case 'mutation-observer':
      return 'MutationObserver' in window;
    
    case 'local-storage':
      try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    
    case 'session-storage':
      try {
        const testKey = '__test__';
        sessionStorage.setItem(testKey, testKey);
        sessionStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    
    case 'web-animation':
      return 'Animation' in window;
    
    case 'fetch':
      return 'fetch' in window;
    
    case 'promise':
      return 'Promise' in window;
    
    case 'async-await':
      try {
        eval('async () => {}');
        return true;
      } catch (e) {
        return false;
      }
    
    // For image format support, we need to use a different approach
    // since these are async checks. We'll return false by default
    // and use isImageFormatSupported for these checks instead.
    case 'webp':
    case 'avif':
      return false;
    
    default:
      return false;
  }
}

/**
 * Check if an image format is supported in the current browser
 * @param format The image format to check
 * @returns A promise that resolves to true if the format is supported, false otherwise
 */
export async function isImageFormatSupported(format: 'webp' | 'avif'): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  switch (format) {
    case 'webp':
      return await checkWebpSupport();
    case 'avif':
      return await checkAvifSupport();
    default:
      return false;
  }
}

/**
 * Check if WebP image format is supported
 * @returns A promise that resolves to true if WebP is supported, false otherwise
 */
export function checkWebpSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpImage = new Image();
    webpImage.onload = () => resolve(true);
    webpImage.onerror = () => resolve(false);
    webpImage.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
}

/**
 * Check if AVIF image format is supported
 * @returns A promise that resolves to true if AVIF is supported, false otherwise
 */
export function checkAvifSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const avifImage = new Image();
    avifImage.onload = () => resolve(true);
    avifImage.onerror = () => resolve(false);
    avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

/**
 * Apply a fallback if a feature is not supported
 * @param feature The feature to check
 * @param fallback The fallback function to call if the feature is not supported
 */
export function applyFallbackIfNeeded(feature: Feature, fallback: () => void): void {
  if (!isFeatureSupported(feature)) {
    fallback();
  }
}

/**
 * Apply a fallback for image formats if not supported
 * @param format The image format to check
 * @param fallback The fallback function to call if the format is not supported
 */
export async function applyImageFallbackIfNeeded(
  format: 'webp' | 'avif',
  fallback: () => void
): Promise<void> {
  if (!(await isImageFormatSupported(format))) {
    fallback();
  }
}

/**
 * Load a polyfill for a feature if it's not supported
 * @param feature The feature to check
 * @param polyfillUrl The URL of the polyfill to load
 * @returns A promise that resolves when the polyfill is loaded
 */
export function loadPolyfillIfNeeded(feature: Feature, polyfillUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isFeatureSupported(feature)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = polyfillUrl;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load polyfill for ${feature}`));
    document.head.appendChild(script);
  });
}

/**
 * Features that can be detected
 */
export type Feature =
  | 'css-variables'
  | 'css-grid'
  | 'css-flexbox'
  | 'css-backdrop-filter'
  | 'intersection-observer'
  | 'resize-observer'
  | 'mutation-observer'
  | 'local-storage'
  | 'session-storage'
  | 'web-animation'
  | 'fetch'
  | 'promise'
  | 'async-await'
  | 'webp'
  | 'avif';

/**
 * Common polyfill URLs
 */
export const POLYFILL_URLS = {
  'intersection-observer': 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
  'resize-observer': 'https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver',
  'fetch': 'https://polyfill.io/v3/polyfill.min.js?features=fetch',
  'promise': 'https://polyfill.io/v3/polyfill.min.js?features=Promise',
  'web-animation': 'https://polyfill.io/v3/polyfill.min.js?features=Web+Animations',
  'custom-event': 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent',
  'all': 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CResizeObserver%2Cfetch%2CPromise%2CWeb+Animations%2CCustomEvent'
};
