'use client';

import React from 'react';
import { ColorName, colorClasses } from './types';

interface OnboardingTooltipProps {
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  onboardingRef: React.RefObject<HTMLDivElement | null>;
  themeColor: ColorName;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  showOnboarding,
  setShowOnboarding,
  onboardingRef,
  themeColor
}) => {
  if (!showOnboarding) return null;
  
  const colorClass = colorClasses[themeColor];
  
  return (
    <div 
      ref={onboardingRef}
      className={`
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 z-50
        max-w-md w-full animate-fadeIn
        border-2 ${colorClass.border}
      `}
    >
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowOnboarding(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close onboarding"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full ${colorClass.bg} flex items-center justify-center mr-4`}>
          <svg className={`w-6 h-6 ${colorClass.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Welcome to AI Moments!</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Select up to 3 use cases that interest you most to create your personalized AI journey.
      </p>
      
      <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-6">
        <div className="mr-3">
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-blue-700 dark:text-blue-300">Your selections are saved</h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">We'll remember your choices for your next visit.</p>
        </div>
      </div>
      
      <button 
        onClick={() => setShowOnboarding(false)}
        className={`w-full py-3 px-4 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white font-medium rounded-lg transition-colors`}
      >
        Let's get started!
      </button>
    </div>
  );
};

export default OnboardingTooltip;
