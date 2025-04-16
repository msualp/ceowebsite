'use client';

import React from 'react';
import { Rocket, Gift, ArrowRight, Check } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

/**
 * Welcome step shown before the form starts
 */
const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Rocket size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join Sociail's Early Access</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Be among the first to experience our revolutionary AI-powered collaboration platform. 
        Program launches in June 2025!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5">
            <Check size={14} />
          </div>
          <span className="text-gray-700 dark:text-gray-300">Multi-agent AI collaboration</span>
        </div>
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5">
            <Check size={14} />
          </div>
          <span className="text-gray-700 dark:text-gray-300">Priority support</span>
        </div>
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5">
            <Check size={14} />
          </div>
          <span className="text-gray-700 dark:text-gray-300">Early access to features</span>
        </div>
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5">
            <Check size={14} />
          </div>
          <span className="text-gray-700 dark:text-gray-300">Special early adopter pricing</span>
        </div>
      </div>
      
      {/* T-shirt highlight */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 flex items-center">
        <div className="flex-shrink-0 mr-4">
          <Gift size={24} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-medium text-indigo-900 dark:text-indigo-300">Free Limited Edition T-Shirt</h3>
          <p className="text-indigo-700 dark:text-indigo-400 text-sm">Selected participants will receive an exclusive Sociail t-shirt!</p>
        </div>
      </div>
      
      <div className="pt-4">
        <button 
          onClick={onStart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-lg shadow-md hover:shadow-lg"
        >
          Apply for Early Access
          <ArrowRight size={18} className="ml-2" />
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
          Limited spots available. Don't miss your chance!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
