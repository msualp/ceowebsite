'use client';

import React from 'react';
import { StepProps } from '../types';
import { AI_INTEREST_OPTIONS } from '../constants';

/**
 * Third step of the form - AI Interest
 */
const AIInterestStep: React.FC<StepProps> = ({ 
  formData, 
  formError, 
  handleInputChange 
}) => {
  return (
    <div id="step-3" className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">What is your primary interest in AI?</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-5">Let us know how you plan to use AI and AI-powered tools like Sociail.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AI_INTEREST_OPTIONS.map(option => (
          <label 
            key={option.value}
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all h-36 ${
              formData.aiInterest === option.value 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600/30'
            }`}
          >
            <input 
              type="radio" 
              name="aiInterest" 
              value={option.value}
              checked={formData.aiInterest === option.value}
              onChange={handleInputChange}
              className="hidden"
              aria-describedby={formError ? "interest-error" : undefined}
            />
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-300">
              {renderIcon(option.icon)}
            </div>
            <span className="block font-medium text-gray-900 dark:text-white text-center">{option.label}</span>
            <span className="text-sm text-center text-gray-500 dark:text-gray-300 mt-1">{option.description}</span>
          </label>
        ))}
      </div>

      {formError && (
        <p id="interest-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}
    </div>
  );
};

// Helper function to render icons
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'graduation-cap':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      );
    default:
      return null;
  }
};

export default AIInterestStep;
