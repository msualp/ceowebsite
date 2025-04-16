'use client';

import React from 'react';
import { ProgressBarProps } from '../types';

/**
 * Progress bar component for multi-step form
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="w-full mb-8 px-6">
      <div className="flex justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div 
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner" 
        role="progressbar" 
        aria-valuenow={Math.round(progress)} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label={`Form progress: ${Math.round(progress)}%`}
      >
        <div 
          className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-out shadow-sm" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full ${
              index < currentStep 
                ? 'bg-indigo-600 dark:bg-indigo-500' 
                : 'bg-gray-300 dark:bg-gray-600'
            } transition-colors duration-300`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
