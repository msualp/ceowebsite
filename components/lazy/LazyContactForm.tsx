/**
 * Lazy-loaded ContactForm component
 * 
 * This component uses React.lazy and Suspense to load the ContactForm component
 * only when it's needed, reducing the initial bundle size.
 */

import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the contact form
const ContactFormLoading = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
    
    {/* Name field */}
    <div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Email field */}
    <div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Subject field */}
    <div>
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Reason field */}
    <div>
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Message field */}
    <div>
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Submit button */}
    <div className="text-center">
      <div className="h-10 w-32 bg-blue-200 dark:bg-blue-700 rounded mx-auto"></div>
    </div>
  </div>
);

// Lazy load the ContactForm component
const LazyContactForm = lazyLoad(
  () => import('@/components/ContactForm'),
  ContactFormLoading
);

export default LazyContactForm;
