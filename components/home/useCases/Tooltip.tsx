'use client';

import React from 'react';
import { TooltipData } from './types';

interface TooltipProps {
  tooltipRef: React.RefObject<HTMLDivElement>;
  tooltip: TooltipData;
  colorClass: {
    text: string;
    border: string;
  };
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipRef, tooltip, colorClass }) => {
  return (
    <div 
      ref={tooltipRef}
      className={`
        absolute left-1/2 bottom-full mb-3 -translate-x-1/2 
        w-64 p-4 rounded-lg shadow-lg z-50
        bg-white dark:bg-gray-800 border ${colorClass.border}
        transition-all duration-200 ease-in-out
        animate-fadeIn
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute w-4 h-4 rotate-45 bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 left-1/2 -bottom-2 -translate-x-1/2"></div>
      <h4 className={`font-bold text-base mb-1 ${colorClass.text}`}>{tooltip.title}</h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{tooltip.description}</p>
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1"><strong>Example:</strong> {tooltip.example}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400"><strong>Insight:</strong> {tooltip.stats}</div>
    </div>
  );
};

export default Tooltip;
