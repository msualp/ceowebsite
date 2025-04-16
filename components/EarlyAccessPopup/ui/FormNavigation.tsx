'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { FormNavigationProps } from '../types';
import { TOTAL_STEPS } from '../constants';

/**
 * Navigation buttons for multi-step form
 */
const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  handlePrev,
  handleNext,
  handleSubmit
}) => {
  return (
    <div className="flex justify-between mt-8 px-6 pb-6">
      {/* Back button - hidden on first step */}
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          disabled={isSubmitting}
          aria-label="Go back to previous step"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back</span>
        </button>
      ) : (
        <div></div> // Empty div to maintain layout
      )}

      {/* Next/Submit button */}
      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
          disabled={isSubmitting}
          aria-label="Continue to next step"
        >
          <span>Continue</span>
          <ArrowRight size={18} className="ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
          disabled={isSubmitting}
          aria-label="Submit form"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
