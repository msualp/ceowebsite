'use client';

/**
 * NOTE: This component is currently incomplete and under development.
 * 
 * TODO:
 * - Fix animation issues with cards moving horizontally
 * - Ensure tooltips only show one at a time
 * - Improve performance with large number of cards
 * - Fix positioning of tooltips on mobile devices
 * - Ensure proper accessibility for screen readers
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { TooltipCard } from './TooltipCard';
import './scrollbar-hide.css';
import './AnimationStyles.css';
import { UseCase, SectionName, ColorName, colorClasses, AnimationState, getCategoryColor } from './types';

interface SingleCategoryRowProps {
  allUseCases: UseCase[];
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
  onTouchEnd: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  buttonClicked?: boolean;
}

const SingleCategoryRow: React.FC<SingleCategoryRowProps> = ({
  allUseCases,
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
  handleKeyDown,
  buttonClicked = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Create a map to store refs for each card
  const cardRefsMap = useMemo(() => new Map<string, HTMLElement | null>(), []);
  
  // Function to set ref for a card
  const setCardRef = (id: string, element: HTMLElement | null) => {
    cardRefsMap.set(id, element);
  };
  
  // Function to get ref for a card
  const getCardRef = (id: string): React.RefObject<HTMLElement | null> => {
    return {
      current: cardRefsMap.get(id) || null
    };
  };
  
  // Tooltip close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setActiveTooltip(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateAnimationState = (state: AnimationState) => {
    setAnimationState((prev: any) => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key as SectionName] = state;
      });
      return newState;
    });
  };
  
  // Find cards that should pulse (first time user or recommended items)
  const shouldPulseCard = (id: string) => {
    if (firstTimeUser && id === 'personal-0') return true;
    return recommendedItems.includes(id);
  };
  
  // Check if any section is visible
  const isVisible = Object.values(sectionVisibility).some(visible => visible);
  
  // Check if animation is paused for any section
  const isPaused = Object.values(animationState).some(state => state === 'paused');
  
  // Check if animation is slowed for any section
  const isSlowed = Object.values(animationState).some(state => state === 'slowed');
  
  // Check if any pill is hovered
  const isAnyPillHovered = Object.values(hoveredPill).some(hovered => hovered);
  
  return (
    <div 
      className={`
        relative z-[50] overflow-x-auto overflow-visible scroll-snap-x mandatory mb-6 pt-24
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}
        ${!buttonClicked ? 'filter blur-sm backdrop-blur-md' : ''}
      `}
      role="region" 
      aria-label="All AI use cases"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative overflow-visible">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gray-100 dark:from-gray-900 to-transparent z-20"></div>
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-gray-100 dark:from-gray-900 to-transparent z-20"></div>
        
        <div 
          ref={sectionRef}
          className={`
            flex space-x-10 py-3 px-4 touch-pan-x use-cases-row 
            overflow-x-auto cursor-grab ${isDragging ? 'cursor-grabbing' : ''}
            scrollbar-hide scroll-smooth
            ${buttonClicked && animationState.personal !== 'paused' ? 'animate-marquee' : ''}
          `}
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
            WebkitOverflowScrolling: 'touch',
            width: buttonClicked && animationState.personal !== 'paused' ? '200%' : 'auto'
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            setStartX(e.pageX - (sectionRef.current?.offsetLeft || 0));
            setScrollLeft(sectionRef.current?.scrollLeft || 0);
            
            // Pause animation when dragging starts
            setAnimationState((prev: any) => {
              const newState = {...prev};
              Object.keys(newState).forEach(key => {
                newState[key as SectionName] = 'paused';
              });
              return newState;
            });
          }}
          onMouseLeave={() => {
            if (isDragging) {
              setIsDragging(false);
              
              // Resume animation when dragging ends
              if (!isAnyPillHovered) {
                setAnimationState((prev: any) => {
                  const newState = {...prev};
                  Object.keys(newState).forEach(key => {
                    newState[key as SectionName] = 'running';
                  });
                  return newState;
                });
              }
            }
          }}
          onMouseUp={() => {
            setIsDragging(false);
            
            // Resume animation when dragging ends
            if (!isAnyPillHovered) {
              setAnimationState((prev: any) => {
                const newState = {...prev};
                Object.keys(newState).forEach(key => {
                  newState[key as SectionName] = 'running';
                });
                return newState;
              });
            }
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - (sectionRef.current?.offsetLeft || 0);
            const walk = (x - startX) * 2; // Adjust scrolling speed
            if (sectionRef.current) {
              sectionRef.current.scrollLeft = scrollLeft - walk;
            }
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            setStartX(e.touches[0].pageX - (sectionRef.current?.offsetLeft || 0));
            setScrollLeft(sectionRef.current?.scrollLeft || 0);
            onTouchStart(e);
            
            // Pause animation when dragging starts
            setAnimationState((prev: any) => {
              const newState = {...prev};
              Object.keys(newState).forEach(key => {
                newState[key as SectionName] = 'paused';
              });
              return newState;
            });
          }}
          onTouchMove={(e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - (sectionRef.current?.offsetLeft || 0);
            const walk = (x - startX) * 2; // Adjust scrolling speed
            if (sectionRef.current) {
              sectionRef.current.scrollLeft = scrollLeft - walk;
            }
            onTouchMove(e);
          }}
          onTouchEnd={() => {
            setIsDragging(false);
            onTouchEnd();
            
            // Resume animation when dragging ends
            if (!isAnyPillHovered) {
              setAnimationState((prev: any) => {
                const newState = {...prev};
                Object.keys(newState).forEach(key => {
                  newState[key as SectionName] = 'running';
                });
                return newState;
              });
            }
          }}
        >
          {/* First set - filter out selected use cases */}
          {allUseCases.filter(useCase => !isUseCaseSelected(useCase.id)).map((useCase) => {
            const category = useCase.category;
            const colorName = getCategoryColor(category);
            const colorClass = colorClasses[colorName];
            
            return (
              <div 
                key={useCase.id}
                ref={(el) => setCardRef(useCase.id, el)}
                className={`
                  inline-flex flex-col px-5 py-6 rounded-xl
                  h-32 w-56
                  ${isUseCaseSelected(useCase.id) 
                    ? `${colorClass.highlight} ${colorClass.border} border-2 shadow-md` 
                    : recommendedItems.includes(useCase.id) 
                      ? `bg-white dark:bg-gray-800 shadow-md border-2 ${colorClass.border} border-dashed` 
                      : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700'} 
                  min-w-max scroll-snap-start use-case-pill
                  transition-all duration-300 ease-in-out 
                  ${selectedUseCasesCount >= maxSelections && !isUseCaseSelected(useCase.id) ? 'opacity-60' : 'opacity-100'}
                  ${selectionComplete && !isUseCaseSelected(useCase.id) ? 'pointer-events-none' : ''}
                  ${!buttonClicked ? 'pointer-events-none' : 'cursor-pointer'}
                  hover:shadow-lg hover:scale-105 active:scale-95
                  ${shouldPulseCard(useCase.id) ? 'animate-pulse-subtle' : ''}
                  relative
                `}
                role="button"
                aria-pressed={isUseCaseSelected(useCase.id)}
                aria-label={`Select ${useCase.text}`}
                aria-describedby={activeTooltip === useCase.id ? `tooltip-${useCase.id}` : undefined}
                data-use-case-id={useCase.id}
                tabIndex={0}
                onClick={(e) => {
                  // Don't select when clicking on the card, only when clicking on the checkbox
                  if (isDragging) return;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleUseCaseSelection(useCase.id);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredPill((prev: any) => ({...prev, [category]: true}));
                  updateAnimationState('paused');
                  setActiveTooltip(useCase.id);
                }}
                onMouseLeave={() => {
                  setHoveredPill((prev: any) => ({...prev, [category]: false}));
                  updateAnimationState('slowed');
                  // After a short delay, resume normal animation if the mouse is not over the section
                  setTimeout(() => {
                    setAnimationState((prev: any) => {
                      const newState = { ...prev };
                      const shouldResume = !Object.values(prev).includes('paused');
                      if (shouldResume) {
                        Object.keys(newState).forEach(key => {
                          if (newState[key as SectionName] === 'slowed') {
                            newState[key as SectionName] = 'running';
                          }
                        });
                      }
                      return newState;
                    });
                  }, 1000);
                }}
              >
                {/* Category label as pill on top left */}
                <div className="absolute -top-3 left-3 z-[999]">
                  <div className={`${colorClass.bg} ${colorClass.text} text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </div>
                
                {/* Recommended indicator */}
                {recommendedItems.includes(useCase.id) && (
                  <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-bold shadow-sm">
                    <span className={colorClass.text}>Recommended</span>
                  </div>
                )}
                
                <div className="flex items-start mt-4">
                  <div 
                    className={`
                      w-6 h-6 rounded-md mr-3 flex-shrink-0 border-2 ${isUseCaseSelected(useCase.id) ? colorClass.border : 'border-gray-300 dark:border-gray-600'} 
                      flex items-center justify-center mt-0.5
                      transition-all duration-200 ease-in-out
                      ${isUseCaseSelected(useCase.id) ? colorClass.bg : 'bg-white dark:bg-gray-800'}
                      ${shouldPulseCard(useCase.id) && !isUseCaseSelected(useCase.id) ? 'animate-ping-slow' : ''}
                      cursor-pointer
                      hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500
                    `} 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUseCaseSelection(useCase.id, e);
                    }}
                    aria-hidden="true"
                  >
                    {isUseCaseSelected(useCase.id) ? (
                      <svg 
                        className="w-4 h-4 text-white dark:text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg 
                        className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-bold text-base md:text-lg">
                    {useCase.text}
                  </span>
                </div>
                
                {/* Use TooltipCard component - only show for the first set, not duplicates */}
                {activeTooltip === useCase.id && (
                  <TooltipCard
                    anchorRef={getCardRef(useCase.id)}
                    title={useCase.tooltip.title}
                    description={useCase.tooltip.description}
                    example={useCase.tooltip.example}
                    stats={useCase.tooltip.stats}
                    colorClass={colorClass}
                    autoDismiss={true}
                    dismissDelay={8000}
                  />
                )}
              </div>
            );
          })}
          
          {/* Duplicate for infinite scroll - filter out selected use cases */}
          {allUseCases.filter(useCase => !isUseCaseSelected(useCase.id)).map((useCase) => {
            const category = useCase.category;
            const colorName = getCategoryColor(category);
            const colorClass = colorClasses[colorName];
            
            return (
              <div 
                key={`dup-${useCase.id}`}
                ref={(el) => setCardRef(useCase.id, el)}
                className={`
                  inline-flex flex-col px-5 py-6 rounded-xl
                  h-32 w-56
                  ${isUseCaseSelected(useCase.id) 
                    ? `${colorClass.highlight} ${colorClass.border} border-2 shadow-md` 
                    : recommendedItems.includes(useCase.id) 
                      ? `bg-white dark:bg-gray-800 shadow-md border-2 ${colorClass.border} border-dashed` 
                      : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700'} 
                  min-w-max scroll-snap-start use-case-pill
                  transition-all duration-300 ease-in-out 
                  ${selectedUseCasesCount >= maxSelections && !isUseCaseSelected(useCase.id) ? 'opacity-60' : 'opacity-100'}
                  ${selectionComplete && !isUseCaseSelected(useCase.id) ? 'pointer-events-none' : ''}
                  ${!buttonClicked ? 'pointer-events-none' : 'cursor-pointer'}
                  hover:shadow-lg hover:scale-105 active:scale-95
                  ${shouldPulseCard(useCase.id) ? 'animate-pulse-subtle' : ''}
                  relative
                `}
                role="button"
                aria-pressed={isUseCaseSelected(useCase.id)}
                aria-label={`Select ${useCase.text}`}
                aria-describedby={activeTooltip === useCase.id ? `tooltip-${useCase.id}` : undefined}
                data-use-case-id={useCase.id}
                tabIndex={0}
                onClick={(e) => {
                  // Don't select when clicking on the card, only when clicking on the checkbox
                  if (isDragging) return;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleUseCaseSelection(useCase.id);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredPill((prev: any) => ({...prev, [category]: true}));
                  updateAnimationState('paused');
                  setActiveTooltip(useCase.id);
                }}
                onMouseLeave={() => {
                  setHoveredPill((prev: any) => ({...prev, [category]: false}));
                  updateAnimationState('slowed');
                  // After a short delay, resume normal animation if the mouse is not over the section
                  setTimeout(() => {
                    setAnimationState((prev: any) => {
                      const newState = { ...prev };
                      const shouldResume = !Object.values(prev).includes('paused');
                      if (shouldResume) {
                        Object.keys(newState).forEach(key => {
                          if (newState[key as SectionName] === 'slowed') {
                            newState[key as SectionName] = 'running';
                          }
                        });
                      }
                      return newState;
                    });
                  }, 1000);
                }}
              >
                {/* Category label as pill on top left */}
                <div className="absolute -top-3 left-3 z-[999]">
                  <div className={`${colorClass.bg} ${colorClass.text} text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </div>
                
                {/* Recommended indicator */}
                {recommendedItems.includes(useCase.id) && (
                  <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-bold shadow-sm">
                    <span className={colorClass.text}>Recommended</span>
                  </div>
                )}
                
                <div className="flex items-start mt-4">
                  <div 
                    className={`
                      w-6 h-6 rounded-md mr-3 flex-shrink-0 border-2 ${isUseCaseSelected(useCase.id) ? colorClass.border : 'border-gray-300 dark:border-gray-600'} 
                      flex items-center justify-center mt-0.5
                      transition-all duration-200 ease-in-out
                      ${isUseCaseSelected(useCase.id) ? colorClass.bg : 'bg-white dark:bg-gray-800'}
                      ${shouldPulseCard(useCase.id) && !isUseCaseSelected(useCase.id) ? 'animate-ping-slow' : ''}
                      cursor-pointer
                      hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500
                    `} 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUseCaseSelection(useCase.id, e);
                    }}
                    aria-hidden="true"
                  >
                    {isUseCaseSelected(useCase.id) ? (
                      <svg 
                        className="w-4 h-4 text-white dark:text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg 
                        className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-bold text-base md:text-lg">
                    {useCase.text}
                  </span>
                </div>
                
                {/* No tooltips for duplicates to avoid multiple tooltips */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryRow;
