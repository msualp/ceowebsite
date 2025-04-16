'use client';

import React from 'react';
import { StepProps } from '../types';
import { AI_EXPERIENCE_OPTIONS } from '../constants';

/**
 * Second step of the form - AI Experience
 */
const AIExperienceStep: React.FC<StepProps> = ({ 
  formData, 
  formError, 
  handleInputChange 
}) => {
  return (
    <div id="step-2" className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">How do you rate yourself on using AI?</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-5">Select the option that best describes your experience with AI and AI-powered tools.</p>
      
      <div className="space-y-3">
        {AI_EXPERIENCE_OPTIONS.map(option => (
          <label 
            key={option.value}
            className={`flex p-5 border-2 rounded-xl cursor-pointer transition-all ${
              formData.aiExperience === option.value 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600/30'
            }`}
          >
            <input 
              type="radio" 
              name="aiExperience" 
              value={option.value}
              checked={formData.aiExperience === option.value}
              onChange={handleInputChange}
              className="h-5 w-5 text-indigo-600 mt-1"
              aria-describedby={formError ? "experience-error" : undefined}
            />
            <div className="ml-4">
              <span className="block font-medium text-gray-900 dark:text-white text-lg">{option.label}</span>
              <span className="text-gray-500 dark:text-gray-300">{option.description}</span>
            </div>
          </label>
        ))}
      </div>

      {formError && (
        <p id="experience-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}
    </div>
  );
};

export default AIExperienceStep;
