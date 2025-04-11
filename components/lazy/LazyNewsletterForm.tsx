/**
 * Lazy-loaded NewsletterForm component
 * 
 * This component uses React.lazy and Suspense to load the NewsletterForm component
 * only when it's needed, reducing the initial bundle size.
 */

import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the newsletter form
const NewsletterFormLoading = () => (
  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto animate-pulse">
    <div className="flex-grow">
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="h-10 w-24 bg-blue-200 dark:bg-blue-700 rounded"></div>
  </div>
);

// Lazy load the NewsletterForm component
const LazyNewsletterForm = lazyLoad(
  () => import('@/components/NewsletterForm'),
  NewsletterFormLoading
);

export default LazyNewsletterForm;
