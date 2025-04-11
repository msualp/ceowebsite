/**
 * Dynamic Routes
 * 
 * This file contains dynamically imported page components for route-based code splitting.
 * It helps reduce the initial bundle size by loading page components only when needed.
 */

import { dynamicPage, dynamicClientPage } from '@/lib/route-splitting';

// Custom loading components for specific pages
const AboutPageLoading = () => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-blue-200 dark:bg-blue-800 mb-6"></div>
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPageLoading = () => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-blue-200 dark:bg-blue-800 mb-6"></div>
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
      
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  </div>
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
