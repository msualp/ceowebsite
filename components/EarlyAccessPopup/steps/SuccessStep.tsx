'use client';

import React from 'react';
import { Ticket, Check } from 'lucide-react';

interface SuccessStepProps {
  handleClose: () => void;
}

/**
 * Success step shown after form submission
 */
const SuccessStep: React.FC<SuccessStepProps> = ({ handleClose }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 animate-fadeIn">
      <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6 shadow-md">
        <Ticket size={30} className="text-yellow-500 dark:text-yellow-400" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're In!</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Thanks for applying to Sociail's Early Access Program! 
      </p>
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 mb-6 max-w-md shadow-sm">
        <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Look for the Golden Ticket!</h3>
        <p className="text-indigo-700 dark:text-indigo-400">
          Keep an eye on your inbox for our welcome email. If you're selected for our 
          exclusive first wave, you'll find your access code (aka "Golden Ticket") 
          and T-shirt redemption instructions!
        </p>
      </div>
      
      <div className="space-y-4 mb-6 w-full max-w-md">
        <div className="flex items-start bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
          <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3 mt-0.5">
            <Check size={14} />
          </div>
          <div className="text-left">
            <span className="text-green-800 dark:text-green-300 font-medium">Application Received</span>
            <p className="text-green-700 dark:text-green-400 text-sm">We've successfully received your application</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleClose}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-800 shadow-md hover:shadow-lg"
        aria-label="Close popup"
      >
        Awesome, Got It!
      </button>
    </div>
  );
};

export default SuccessStep;
