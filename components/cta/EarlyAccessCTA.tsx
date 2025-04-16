'use client';

import { useState } from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { useEarlyAccessPopup } from '../EarlyAccessPopup';

interface EarlyAccessCTAProps {
  className?: string;
  variant?: 'default' | 'prominent' | 'minimal';
  backgroundColor?: string;
  showCounter?: boolean;
}

export function EarlyAccessCTA({
  className = '',
  variant = 'default',
  backgroundColor = 'bg-blue-50 dark:bg-blue-900/20',
  showCounter = false,
}: EarlyAccessCTAProps) {
  const { openEarlyAccessPopup } = useEarlyAccessPopup();
  const remainingSpots = 247; // This would be fetched from an API in a real implementation

  if (variant === 'minimal') {
    return (
      <div className={`${className}`}>
        <Button 
          variant="primary" 
          onClick={openEarlyAccessPopup}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Join Early Access
        </Button>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className={`${backgroundColor} p-8 rounded-xl shadow-md ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Join the Sociail Beta Program</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-0">
              Be among the first to experience the future of AI collaboration.
            </p>
            {showCounter && (
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {remainingSpots} spots remaining
                </span>
              </div>
            )}
          </div>
          
          <Button
            variant="primary"
            onClick={openEarlyAccessPopup}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="md:w-auto w-full"
          >
            Apply for Early Access
          </Button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${backgroundColor} p-6 rounded-lg ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">Early Access Program</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3">Be the first to experience Sociail</h3>
      
      <Button
        variant="primary"
        onClick={openEarlyAccessPopup}
        rightIcon={<ArrowRight className="w-4 h-4" />}
        className="w-full sm:w-auto"
      >
        Apply Now
      </Button>
      
      {showCounter && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-green-600 dark:text-green-400">{remainingSpots} spots</span> remaining in our limited beta program
        </div>
      )}
    </div>
  );
}
