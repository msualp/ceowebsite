/**
 * Route-Based Code Splitting Utilities
 * 
 * This file contains utilities for implementing route-based code splitting in the application.
 * It provides a consistent way to dynamically import page components and handle loading states.
 */

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Default loading component for route-based code splitting
export const RouteLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-blue-200 dark:bg-blue-800 mb-6"></div>
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

/**
 * Creates a dynamically loaded page component with loading state
 * 
 * @param importFunc - Dynamic import function for the page component
 * @param LoadingComponent - Component to show while loading (optional)
 * @param ssr - Whether to use server-side rendering (default: true)
 * @returns Dynamically loaded page component with loading state
 */
export function dynamicPage(
  importFunc: () => Promise<{ default: any }>,
  LoadingComponent = RouteLoadingFallback,
  ssr = true
) {
  return dynamic(importFunc, {
    loading: LoadingComponent,
    ssr
  });
}

/**
 * Creates a dynamically loaded page component with loading state and no SSR
 * Use this for pages that should only be rendered on the client
 * 
 * @param importFunc - Dynamic import function for the page component
 * @param LoadingComponent - Component to show while loading (optional)
 * @returns Dynamically loaded page component with loading state and no SSR
 */
export function dynamicClientPage(
  importFunc: () => Promise<{ default: any }>,
  LoadingComponent = RouteLoadingFallback
) {
  return dynamicPage(importFunc, LoadingComponent, false);
}
