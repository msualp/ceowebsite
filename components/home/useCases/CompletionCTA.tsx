'use client';

import React from 'react';
import { ColorName, colorClasses } from './types';

interface CompletionCTAProps {
  selectionComplete: boolean;
  themeColor: ColorName;
}

const CompletionCTA: React.FC<CompletionCTAProps> = ({
  selectionComplete,
  themeColor
}) => {
  const colorClass = colorClasses[themeColor];
  
  return (
    <div 
      className={`
        text-center mb-10
        transition-all duration-500 ease-in-out transform
        ${selectionComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
    >
      <a 
        href="/collaborative-ai/" 
        className={`
          inline-flex items-center text-white font-bold px-8 py-4
          rounded-lg shadow-lg transform hover:scale-105 transition-transform
          text-xl md:text-2xl
          relative overflow-hidden group
          bg-gradient-to-r ${colorClass.gradient} from-offset-0 to-offset-100
          bg-size-200 bg-pos-0 hover:bg-pos-100
          transition-all duration-500
          ${colorClass.glow} shadow-lg
        `}
        aria-label="What will be your AI moment?"
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClass.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        <span className="relative z-10">What will be your AI moment?</span>
        <svg className="w-6 h-6 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
            <defs>
              <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                <rect width="1" height="1" x="0" y="0" fill="rgba(255,255,255,0.1)" />
              </pattern>
            </defs>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default CompletionCTA;
