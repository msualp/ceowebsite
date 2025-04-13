'use client';

import { useRef } from 'react';
import { UseCase, ColorName, colorClasses } from './types';
import Tooltip from './Tooltip';

interface UseCasePillProps {
  useCase: UseCase;
  color: ColorName;
  isSelected: boolean;
  isRecommended: boolean;
  shouldPulse: boolean;
  selectionComplete: boolean;
  maxSelectionsReached: boolean;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
  toggleUseCaseSelection: (id: string, event?: React.MouseEvent | React.TouchEvent) => void;
  setHoveredPill: (prev: any) => void;
  setAnimationState: (prev: any) => void;
  section: string;
}

const UseCasePill = ({
  useCase,
  color,
  isSelected,
  isRecommended,
  shouldPulse,
  selectionComplete,
  maxSelectionsReached,
  activeTooltip,
  setActiveTooltip,
  toggleUseCaseSelection,
  setHoveredPill,
  setAnimationState,
  section
}: UseCasePillProps) => {
  const colorClass = colorClasses[color];
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      className={`
        inline-flex items-center px-5 py-3 rounded-full 
        ${isSelected 
          ? `${colorClass.highlight} ${colorClass.border} border-2 shadow-md` 
          : isRecommended 
            ? `bg-white dark:bg-gray-800 shadow-md border-2 ${colorClass.border} border-dashed` 
            : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700'} 
        min-w-max scroll-snap-start use-case-pill
        transition-all duration-300 ease-in-out 
        ${maxSelectionsReached && !isSelected ? 'opacity-60' : 'opacity-100'}
        ${selectionComplete && !isSelected ? 'pointer-events-none' : ''}
        cursor-pointer
        hover:shadow-lg hover:scale-105 active:scale-95
        ${shouldPulse ? 'animate-pulse-subtle' : ''}
        relative
      `}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${useCase.text}`}
      data-use-case-id={useCase.id}
      tabIndex={0}
      onClick={(e) => toggleUseCaseSelection(useCase.id, e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleUseCaseSelection(useCase.id);
        }
      }}
      onMouseEnter={() => {
        setHoveredPill((prev: any) => ({...prev, [section]: true}));
        setAnimationState((prev: any) => ({...prev, [section]: 'paused'}));
        setActiveTooltip(useCase.id);
      }}
      onMouseLeave={() => {
        setHoveredPill((prev: any) => ({...prev, [section]: false}));
        setAnimationState((prev: any) => ({...prev, [section]: 'slowed'}));
        // After a short delay, resume normal animation if the mouse is not over the section
        setTimeout(() => {
          setAnimationState((prev: any) => {
            if (prev[section] === 'slowed') {
              return {...prev, [section]: 'running'};
            }
            return prev;
          });
        }, 1000);
      }}
    >
      {/* Recommended indicator */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-bold shadow-sm">
          <span className={colorClass.text}>Recommended</span>
        </div>
      )}
      
      <div className="flex items-center">
        <span 
          className={`
            w-3 h-3 rounded-full mr-3 flex items-center justify-center
            transition-all duration-200 ease-in-out
            ${isSelected ? 'w-4 h-4' : ''}
            ${isSelected ? 'bg-white' : colorClass.dot}
            ${shouldPulse && !isSelected ? 'animate-ping-slow' : ''}
          `} 
          aria-hidden="true"
        >
          {isSelected && (
            <svg 
              className={`w-3 h-3 ${colorClass.text}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span className="text-gray-800 dark:text-gray-200 whitespace-nowrap font-medium text-base md:text-lg">
          {useCase.text}
        </span>
      </div>
      
      {/* Tooltip */}
      {activeTooltip === useCase.id && (
        <Tooltip 
          tooltipRef={tooltipRef}
          tooltip={useCase.tooltip}
          colorClass={colorClass}
        />
      )}
    </div>
  );
};

export default UseCasePill;
