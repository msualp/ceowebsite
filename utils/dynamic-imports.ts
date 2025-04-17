import React, { lazy, Suspense } from 'react';

/**
 * Options for dynamic component loading
 */
interface DynamicImportOptions {
  /** Loading component to show while the main component is loading */
  loadingComponent?: React.ReactNode;
  /** Error component to show if loading fails */
  errorComponent?: React.ReactNode;
  /** Whether to prefetch the component */
  prefetch?: boolean;
  /** Whether to preload the component */
  preload?: boolean;
}

/**
 * Default loading component
 */
const DefaultLoading: React.FC = () => {
  return React.createElement('div', { className: "flex items-center justify-center p-4 min-h-[100px]" },
    React.createElement('div', { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" })
  );
};

/**
 * Default error component
 */
const DefaultError: React.FC = () => {
  return React.createElement('div', { className: "text-red-500 p-4 text-center" }, 
    "Failed to load component"
  );
};

/**
 * Creates a dynamically imported component with loading and error states
 * 
 * @param importFn Function that returns a dynamic import
 * @param options Options for dynamic loading
 * @returns Dynamically loaded component
 */
export function createDynamicComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
): React.ComponentType<React.ComponentProps<T>> {
  const {
    loadingComponent = React.createElement(DefaultLoading),
    errorComponent = React.createElement(DefaultError),
    prefetch = false,
    preload = false,
  } = options;

  // Create lazy component
  const LazyComponent = lazy(importFn);

  // Prefetch or preload if needed
  if (prefetch && typeof window !== 'undefined') {
    // Prefetch after initial page load
    window.addEventListener('load', () => {
      importFn();
    });
  } else if (preload && typeof window !== 'undefined') {
    // Preload immediately
    importFn();
  }

  // Return wrapped component
  const DynamicComponent = (props: React.ComponentProps<T>) => {
    return React.createElement(
      Suspense,
      { fallback: loadingComponent },
      React.createElement(LazyComponent, props)
    );
  };

  return DynamicComponent;
}

/**
 * Creates a dynamically imported component with a custom loading component
 * 
 * @param importFn Function that returns a dynamic import
 * @param LoadingComponent Custom loading component
 * @returns Dynamically loaded component
 */
export function createDynamicComponentWithCustomLoading<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent: React.ComponentType<any>
): React.ComponentType<React.ComponentProps<T>> {
  return createDynamicComponent(importFn, {
    loadingComponent: React.createElement(LoadingComponent),
  });
}
