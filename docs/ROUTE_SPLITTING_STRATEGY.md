# Route-Based Code Splitting Strategy

This document outlines the route-based code splitting strategy implemented for the CEO website to improve performance by reducing the initial bundle size.

## Overview

Route-based code splitting is a technique that allows us to split our JavaScript bundle based on routes, loading only the code necessary for the current page. This approach complements our component-level code splitting strategy and further improves the initial load time of the application.

Our strategy focuses on using Next.js's built-in support for dynamic imports, which allows us to:

1. Reduce the initial bundle size even further
2. Load page components only when they are needed
3. Improve the perceived performance with custom loading states for each route

## Implementation

### 1. Route Splitting Utilities

We've created a set of utilities in `lib/route-splitting.tsx` to make it easy to implement route-based code splitting consistently across the application:

```tsx
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
 */
export function dynamicClientPage(
  importFunc: () => Promise<{ default: any }>,
  LoadingComponent = RouteLoadingFallback
) {
  return dynamicPage(importFunc, LoadingComponent, false);
}
```

### 2. Dynamic Routes Configuration

We've created a central configuration file in `app/dynamic-routes.tsx` that defines all the dynamically imported page components:

```tsx
import { dynamicPage, dynamicClientPage } from '@/lib/route-splitting';

// Custom loading components for specific pages
const AboutPageLoading = () => (
  // Custom loading skeleton for About page
);

const ContactPageLoading = () => (
  // Custom loading skeleton for Contact page
);

// Dynamically imported page components
export const DynamicAboutPage = dynamicPage(
  () => import('./about/page'),
  AboutPageLoading
);

export const DynamicJourneyPage = dynamicPage(
  () => import('./journey/page')
);

export const DynamicContactPage = dynamicPage(
  () => import('./contact/page'),
  ContactPageLoading
);

export const DynamicInsightsPage = dynamicPage(
  () => import('./insights/page')
);

export const DynamicResumePage = dynamicPage(
  () => import('./resume/page')
);

export const DynamicSociailPage = dynamicPage(
  () => import('./sociail/page')
);

// Client-only pages (if any)
export const DynamicCollaborativeAIPage = dynamicClientPage(
  () => import('./collaborative-ai/page')
);
```

### 3. Custom Loading States

We've implemented custom loading states for key pages to provide a better user experience during page transitions:

- **About Page**: Shows a skeleton UI that matches the layout of the About page
- **Contact Page**: Shows a skeleton UI that matches the layout of the Contact page
- **Other Pages**: Use the default loading state

These loading states provide visual feedback while the page component is being loaded, improving the perceived performance of the application.

## Performance Impact

Route-based code splitting has a significant impact on performance:

- **Reduced Initial Bundle Size**: By splitting the bundle based on routes, we've reduced the amount of JavaScript that needs to be downloaded, parsed, and executed on initial page load.
- **Faster First Contentful Paint (FCP)**: With less JavaScript to process, the browser can render the page faster.
- **Improved Time to Interactive (TTI)**: The page becomes interactive sooner because less JavaScript needs to be executed upfront.
- **Better User Experience**: Custom loading states provide visual feedback while page components are being loaded, improving the perceived performance.

## Browser Support

- **Dynamic imports**: Supported in all modern browsers
- **Next.js dynamic**: Supported in all modern browsers

## Future Improvements

1. **Prefetching**: Add prefetching for routes that are likely to be visited soon, such as links visible in the viewport.
2. **Analytics**: Track page load times and bundle sizes to identify further optimization opportunities.
3. **Progressive Enhancement**: Implement progressive enhancement for client-only features to improve the experience for users with slower connections.

## Resources

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [React Code Splitting Documentation](https://reactjs.org/docs/code-splitting.html)
- [Web.dev Guide to Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
