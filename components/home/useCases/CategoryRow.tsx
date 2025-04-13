'use client';

import React, { useRef } from 'react';
import { UseCase, SectionName, ColorName, colorClasses, AnimationState } from './types';
import UseCasePill from './UseCasePill';

interface CategoryRowProps {
  title: string;
  iconSvg: React.ReactNode;
  color: ColorName;
  useCases: UseCase[];
  isReverse: boolean;
  section: SectionName;
  animationState: Record<SectionName, AnimationState>;
  hoveredPill: Record<SectionName, boolean>;
  sectionVisibility: Record<SectionName, boolean>;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
  setHoveredPill: (prev: any) => void;
  setAnimationState: (prev: any) => void;
  toggleUseCaseSelection: (id: string, event?: React.MouseEvent | React.TouchEvent) => void;
  isUseCaseSelected: (id: string) => boolean;
  recommendedItems: string[];
  firstTimeUser: boolean;
  selectionComplete: boolean;
  selectedUseCasesCount: number;
  maxSelections: number;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (section: SectionName) => void;
  handleKeyDown: (e: React.KeyboardEvent, section: SectionName) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  iconSvg,
  color,
  useCases,
  isReverse,
  section,
  animationState,
  hoveredPill,
  sectionVisibility,
  activeTooltip,
  setActiveTooltip,
  setHoveredPill,
  setAnimationState,
  toggleUseCaseSelection,
  isUseCaseSelected,
  recommendedItems,
  firstTimeUser,
  selectionComplete,
  selectedUseCasesCount,
  maxSelections,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  handleKeyDown
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationClass = isReverse ? "animate-marquee-reverse" : "animate-marquee";
  const colorClass = colorClasses[color];
  
  // Find cards that should pulse (first time user or recommended items)
  const shouldPulseCard = (id: string) => {
    if (firstTimeUser && section === 'personal' && id === 'personal-0') return true;
    return recommendedItems.includes(id);
  };
  
  return (
    <div 
      className={`
        relative overflow-x-auto scroll-snap-x mandatory mb-6
        transition-all duration-500 ease-out
        ${sectionVisibility[section] ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}
      `} 
      role="region" 
      aria-label={`${title} use cases`}
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, section)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => onTouchEnd(section)}
    >
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-40 md:w-48 bg-gradient-to-r from-gray-100 dark:from-gray-900 to-transparent z-20 flex items-center">
          <div className={`${colorClass.bg} ${colorClass.text} px-6 py-5 text-lg md:text-xl font-semibold rounded-r-full shadow-md flex items-center gap-3 w-40 md:w-48 justify-center`}>
            {iconSvg}
            <span className="inline">{title}</span>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 dark:from-gray-900 to-transparent z-20"></div>
        
        <div 
          ref={sectionRef}
          className={`flex space-x-6 ${animationState[section] === 'paused' ? "animate-none" : animationClass} py-3 pl-48 pr-16 touch-pan-x use-cases-row`}
          style={{ 
            animationDuration: `${(24 + (useCases.length * 2)) * (animationState[section] === 'slowed' ? 4 : 1)}s`,
            animationPlayState: animationState[section] === 'paused' ? 'paused' : 'running'
          }}
          onMouseEnter={() => setAnimationState((prev: any) => ({...prev, [section]: 'slowed'}))}
          onMouseLeave={() => {
            if (!hoveredPill[section]) {
              setAnimationState((prev: any) => ({...prev, [section]: 'running'}));
            }
          }}
        >
          {/* First set */}
          {useCases.map((useCase) => (
            <UseCasePill
              key={useCase.id}
              useCase={useCase}
              color={color}
              isSelected={isUseCaseSelected(useCase.id)}
              isRecommended={recommendedItems.includes(useCase.id)}
              shouldPulse={shouldPulseCard(useCase.id)}
              selectionComplete={selectionComplete}
              maxSelectionsReached={selectedUseCasesCount >= maxSelections}
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
              toggleUseCaseSelection={toggleUseCaseSelection}
              setHoveredPill={setHoveredPill}
              setAnimationState={setAnimationState}
              section={section}
            />
          ))}
          
          {/* Duplicate for infinite scroll */}
          {useCases.map((useCase) => (
            <UseCasePill
              key={`dup-${useCase.id}`}
              useCase={useCase}
              color={color}
              isSelected={isUseCaseSelected(useCase.id)}
              isRecommended={recommendedItems.includes(useCase.id)}
              shouldPulse={shouldPulseCard(useCase.id)}
              selectionComplete={selectionComplete}
              maxSelectionsReached={selectedUseCasesCount >= maxSelections}
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
              toggleUseCaseSelection={toggleUseCaseSelection}
              setHoveredPill={setHoveredPill}
              setAnimationState={setAnimationState}
              section={section}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
