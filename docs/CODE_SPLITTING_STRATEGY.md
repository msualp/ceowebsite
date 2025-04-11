# Code Splitting Strategy

This document outlines the code splitting strategy implemented for the CEO website to improve performance and reduce initial bundle size.

## Overview

Code splitting is a technique that allows us to split our JavaScript bundle into smaller chunks that can be loaded on demand. This improves the initial load time of the application by only loading the code that is needed for the current page.

Our strategy focuses on component-level code splitting using React.lazy and Suspense, which allows us to:

1. Reduce the initial bundle size
2. Load components only when they are needed
3. Improve the perceived performance of the application

## Implementation

### 1. Code Splitting Utilities

We've created a set of utilities in `lib/code-splitting.tsx` to make it easy to implement code splitting consistently across the application:

```tsx
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

/**
 * Creates a lazy-loaded component with Suspense and ErrorBoundary
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
```

### 2. Lazy-Loaded Components

We've identified and implemented lazy loading for several components that are good candidates for code splitting:

#### ContactForm Component

The ContactForm component is only used on the contact page and contains form validation logic and reCAPTCHA integration. We've created a lazy-loaded version in `components/lazy/LazyContactForm.tsx`:

```tsx
import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the contact form
const ContactFormLoading = () => (
  <div className="space-y-6 animate-pulse">
    {/* Loading skeleton UI */}
  </div>
);

// Lazy load the ContactForm component
const LazyContactForm = lazyLoad(
  () => import('@/components/ContactForm'),
  ContactFormLoading
);

export default LazyContactForm;
```

#### NewsletterForm Component

The NewsletterForm component is used on the insights page and contains form validation logic. We've created a lazy-loaded version in `components/lazy/LazyNewsletterForm.tsx`:

```tsx
import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the newsletter form
const NewsletterFormLoading = () => (
  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto animate-pulse">
    {/* Loading skeleton UI */}
  </div>
);

// Lazy load the NewsletterForm component
const LazyNewsletterForm = lazyLoad(
  () => import('@/components/NewsletterForm'),
  NewsletterFormLoading
);

export default LazyNewsletterForm;
```

#### StructuredData Component

The StructuredData component is used on every page but doesn't need to be loaded immediately. We've created a lazy-loaded version in `components/lazy/LazyStructuredData.tsx`:

```tsx
import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the structured data
// This is an empty component since structured data doesn't have a visual representation
const StructuredDataLoading = () => null;

// Lazy load the StructuredData component
const LazyStructuredData = lazyLoad(
  () => import('@/components/StructuredData'),
  StructuredDataLoading
);

export default LazyStructuredData;
```

### 3. Usage in Pages

We've updated the pages to use the lazy-loaded components:

#### Contact Page

```tsx
import LazyContactForm from '@/components/lazy/LazyContactForm';

export default function ContactPage() {
  return (
    <PageContainer title="Contact">
      {/* ... */}
      <LazyContactForm />
      {/* ... */}
    </PageContainer>
  );
}
```

#### Insights Page

```tsx
import LazyNewsletterForm from '@/components/lazy/LazyNewsletterForm';

export default function InsightsPage() {
  return (
    <PageContainer title="Insights & Blog">
      {/* ... */}
      <LazyNewsletterForm />
      {/* ... */}
    </PageContainer>
  );
}
```

#### SEO Component

```tsx
import LazyStructuredData from './lazy/LazyStructuredData';

export default function SEO({ /* ... */ }) {
  return (
    <>
      <LazyStructuredData type="WebSite" data={websiteData} />
      <LazyStructuredData type="Person" data={personData} />
      <LazyStructuredData type="Organization" data={organizationData} />
      <LazyStructuredData type="WebPage" data={pageData} />
      {type === 'article' && articleData && (
        <LazyStructuredData type="Article" data={articleData} />
      )}
    </>
  );
}
```

## Performance Impact

These improvements have a significant impact on performance:

- **Reduced Initial Bundle Size**: By lazy-loading components, we've reduced the amount of JavaScript that needs to be downloaded, parsed, and executed on initial page load.
- **Faster First Contentful Paint (FCP)**: With less JavaScript to process, the browser can render the page faster.
- **Improved Time to Interactive (TTI)**: The page becomes interactive sooner because less JavaScript needs to be executed upfront.
- **Better User Experience**: Loading skeletons provide visual feedback while components are being loaded, improving the perceived performance.

## Browser Support

- **React.lazy and Suspense**: Supported in all modern browsers
- **Dynamic imports**: Supported in all modern browsers
- **Error boundaries**: Supported in all modern browsers

## Future Improvements

1. **Route-Based Code Splitting**: Implement code splitting at the route level using Next.js's built-in support for dynamic imports.
2. **Prefetching**: Add prefetching for components that are likely to be needed soon.
3. **Bundle Analysis**: Use tools like `@next/bundle-analyzer` to identify more opportunities for code splitting.
4. **Performance Monitoring**: Set up monitoring to track the impact of code splitting on real-world performance metrics.

## Resources

- [React Code Splitting Documentation](https://reactjs.org/docs/code-splitting.html)
- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Web.dev Guide to Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
