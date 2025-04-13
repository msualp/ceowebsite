'use client';

import React from 'react';
import { ColorName, colorClasses } from './types';

interface SectionHeaderProps {
  themeColor: ColorName;
  selectionComplete: boolean;
  uiReady: boolean;
  buttonClicked?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  themeColor,
  selectionComplete,
  uiReady,
  buttonClicked = false
}) => {
  const colorClass = colorClasses[themeColor];
  
  return (
    <div className="relative z-[30] overflow-visible">
      <div className={`text-center mb-8 md:mb-16 px-4 md:px-6 w-full transition-opacity duration-300 z-[20] overflow-visible ${uiReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          The Future of Human-AI Partnership
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          <span className={`bg-gradient-to-r ${colorClass.gradient} bg-clip-text text-transparent`}>
            The Emerging Collaborative AI Ecosystem
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
          Create your personal AI journey by selecting up to 3 use cases that inspire you.
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;
