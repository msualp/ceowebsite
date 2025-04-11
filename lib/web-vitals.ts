/**
 * Web Vitals Tracking Utilities
 * 
 * This file contains utilities for tracking Core Web Vitals metrics.
 * It uses the web-vitals library to measure LCP, FID, CLS, TTFB, and FCP.
 * 
 * @see https://web.dev/vitals/
 */

import { 
  Metric, 
  onLCP, 
  onFID, 
  onCLS, 
  onTTFB, 
  onFCP 
} from 'web-vitals';

// Define the analytics endpoint (replace with your actual analytics endpoint)
const analyticsEndpoint = '/api/analytics';

/**
 * Send metrics to the analytics endpoint
 * 
 * @param metric - The web vitals metric to report
 */
function sendToAnalytics(metric: Metric) {
  // Construct the metric data
  const body = {
    name: metric.name,
    value: metric.value.toFixed(2),
    rating: metric.rating, // 'good', 'needs-improvement', or 'poor'
    delta: metric.delta,
    id: metric.id,
    navigationType: 'navigate', // or 'reload', 'back-forward', 'prerender'
    page: window.location.pathname,
  };

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    navigator.sendBeacon(analyticsEndpoint, blob);
  } else {
    fetch(analyticsEndpoint, {
      body: JSON.stringify(body),
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, `(${metric.rating})`);
  }
}

/**
 * Initialize web vitals tracking
 * 
 * This function should be called once in the app's entry point.
 */
export function initWebVitals() {
  // Core Web Vitals
  onLCP(sendToAnalytics);
  onFID(sendToAnalytics);
  onCLS(sendToAnalytics);
  
  // Additional metrics
  onTTFB(sendToAnalytics);
  onFCP(sendToAnalytics);
}

/**
 * Report web vitals metrics for a specific page
 * 
 * This function can be used in individual pages to track page-specific metrics.
 * 
 * @param path - The page path to associate with the metrics
 */
export function reportWebVitals(path: string) {
  // Create a custom attribution function that adds the page path to the metric data
  const attribution = (metric: Metric) => {
    // Add the page path to the metric data without modifying the name
    const body = {
      ...metric,
      page: path,
      pathname: window.location.pathname,
    };
    
    // Send to analytics
    sendToAnalytics(metric);
    
    // Log with path information in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${path} - ${metric.name}:`, metric.value, `(${metric.rating})`);
    }
  };

  // Track all metrics with the custom attribution
  onLCP(attribution);
  onFID(attribution);
  onCLS(attribution);
  onTTFB(attribution);
  onFCP(attribution);
}
