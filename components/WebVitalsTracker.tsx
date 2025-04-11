'use client';

/**
 * WebVitalsTracker Component
 * 
 * This client component initializes web vitals tracking.
 * It's used in the app layout to ensure web vitals are tracked on all pages.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initWebVitals, reportWebVitals } from '@/lib/web-vitals';

export function WebVitalsTracker() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Initialize web vitals tracking on mount
    initWebVitals();
    
    // Report web vitals for the current page
    reportWebVitals(pathname);
    
    // Log that tracking has been initialized in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals] Tracking initialized for', pathname);
    }
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
}
