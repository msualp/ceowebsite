/**
 * Lazy-loaded StructuredData component
 * 
 * This component uses React.lazy and Suspense to load the StructuredData component
 * only when it's needed, reducing the initial bundle size.
 */

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
