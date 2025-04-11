/**
 * Code Splitting Utilities
 * 
 * This file contains utilities for implementing code splitting in the application.
 * It provides a consistent way to lazy load components and handle loading states.
 */

import React, { lazy, Suspense, ComponentType } from 'react';

// Loading component to show while the actual component is being loaded
export const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4 min-h-[200px]">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-12 w-12 rounded-full bg-blue-200 dark:bg-blue-800 mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

// Error boundary component to handle errors during lazy loading
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p>The component failed to load. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback = () => (
  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
    <p>The component failed to load. Please try refreshing the page.</p>
  </div>
);

/**
 * Creates a lazy-loaded component with Suspense and ErrorBoundary
 * 
 * @param importFunc - Dynamic import function for the component
 * @param LoadingComponent - Component to show while loading (optional)
 * @param ErrorComponent - Component to show on error (optional)
 * @returns Wrapped component with loading and error handling
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  LoadingComponent: React.ComponentType = LoadingFallback,
  ErrorComponent: React.ComponentType = DefaultErrorFallback
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

/**
 * Creates a lazy-loaded component with Suspense but without ErrorBoundary
 * Use this when you already have an ErrorBoundary higher in the component tree
 * 
 * @param importFunc - Dynamic import function for the component
 * @param LoadingComponent - Component to show while loading (optional)
 * @returns Wrapped component with loading handling
 */
export function lazyLoadWithoutErrorBoundary<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  LoadingComponent: React.ComponentType = LoadingFallback
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
