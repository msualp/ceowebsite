'use client';

import React from 'react';
import { ColorName, colorClasses } from './types';

interface SectionHeaderProps {
  themeColor: ColorName;
  selectionComplete: boolean;
  uiReady: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  themeColor,
  selectionComplete,
  uiReady
}) => {
  const colorClass = colorClasses[themeColor];
  
  return (
    <div className={`text-center mb-8 md:mb-16 px-6 md:px-8 max-w-4xl mx-auto transition-opacity duration-300 ${uiReady ? 'opacity-100' : 'opacity-0'}`}>
      <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        The Future of Human-AI Partnership
      </div>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        <span className={`bg-gradient-to-r ${colorClass.gradient} bg-clip-text text-transparent`}>
          The Emerging Collaborative AI Ecosystem
        </span>
      </h2>
      <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Create your personal AI journey by selecting up to 3 use cases that inspire you.
      </p>
      
      {/* Instructions */}
      <div className={`text-center mb-8 px-6 transition-opacity duration-300 ${selectionComplete ? 'opacity-50' : 'opacity-100'}`}>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {selectionComplete 
            ? "Your selections are complete! Click above to continue." 
            : "Click on the cards below to select up to 3 AI use cases that interest you most."}
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;
