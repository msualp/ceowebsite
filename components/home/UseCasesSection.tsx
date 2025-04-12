'use client';

import { useState, useRef, useEffect } from 'react';

// Define types for our section names
type SectionName = 'personal' | 'teams' | 'business';
type ColorName = 'blue' | 'purple' | 'green';
type AnimationState = 'running' | 'slowed' | 'paused';

const UseCasesSection = () => {
  // State for animation state
  const [animationState, setAnimationState] = useState<{
    [key in SectionName]: AnimationState
  }>({
    personal: 'running',
    teams: 'running',
    business: 'running'
  });

  // State to track if any pill is being hovered
  const [hoveredPill, setHoveredPill] = useState<{
    [key in SectionName]: boolean
  }>({
    personal: false,
    teams: false,
    business: false
  });

  // State to track touch events
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Refs for scroll containers
  const personalRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

  // Animation speed factors
  const animationSpeeds = {
    running: 1,
    slowed: 4,  // 4x slower
    paused: 0   // stopped
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle touch start event
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move event
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end event
  const onTouchEnd = (section: SectionName) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Handle different sections
    if (section === 'personal' && personalRef.current) {
      if (isLeftSwipe) {
        personalRef.current.scrollLeft += 200;
      } else if (isRightSwipe) {
        personalRef.current.scrollLeft -= 200;
      }
    } else if (section === 'teams' && teamsRef.current) {
      if (isLeftSwipe) {
        teamsRef.current.scrollLeft += 200;
      } else if (isRightSwipe) {
        teamsRef.current.scrollLeft -= 200;
      }
    } else if (section === 'business' && businessRef.current) {
      if (isLeftSwipe) {
        businessRef.current.scrollLeft += 200;
      } else if (isRightSwipe) {
        businessRef.current.scrollLeft -= 200;
      }
    }
    
    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
  };
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, section: SectionName) => {
    if (e.key === 'ArrowRight') {
      if (section === 'personal' && personalRef.current) {
        personalRef.current.scrollLeft += 200;
      } else if (section === 'teams' && teamsRef.current) {
        teamsRef.current.scrollLeft += 200;
      } else if (section === 'business' && businessRef.current) {
        businessRef.current.scrollLeft += 200;
      }
    } else if (e.key === 'ArrowLeft') {
      if (section === 'personal' && personalRef.current) {
        personalRef.current.scrollLeft -= 200;
      } else if (section === 'teams' && teamsRef.current) {
        teamsRef.current.scrollLeft -= 200;
      } else if (section === 'business' && businessRef.current) {
        businessRef.current.scrollLeft -= 200;
      }
    }
  };
  const teamUseCases = [
    "Accelerating team decisions with intelligent copilots",
    "Turning org-wide knowledge into instant insight",
    "Aligning product, sales, and support with shared AI memory",
    "Facilitating cross-functional collaboration with context-aware AI",
    "Streamlining project management with collaborative intelligence"
  ];
  
  const businessUseCases = [
    "Helping educators scale meaningful feedback at scale",
    "Empowering advisors with context-rich student support",
    "Enabling executives to strategize with real-time intelligence",
    "Transforming customer service with AI-human collaboration",
    "Revolutionizing healthcare with collaborative diagnostics"
  ];

  // Use cases for the categories
  const personalUseCases = [
    "Helping students co-write their future with AI",
    "Enabling solopreneurs to scale expertise on demand",
    "Enhancing creators' workflows with collaborative agents",
    "Supporting researchers with AI-enhanced literature reviews",
    "Helping writers overcome creative blocks with AI collaboration"
  ];

  // Function to render a category row
  const renderCategoryRow = (
    title: string, 
    iconSvg: React.ReactNode, 
    color: ColorName, 
    useCases: string[], 
    isReverse = false, 
    sectionRef: React.RefObject<HTMLDivElement>, 
    section: SectionName
  ) => {
    const animationClass = isReverse ? "animate-marquee-reverse" : "animate-marquee";
    const colorClasses = {
      blue: {
        bg: "bg-blue-200 dark:bg-blue-900",
        text: "text-blue-800 dark:text-blue-300",
        dot: "bg-blue-500"
      },
      purple: {
        bg: "bg-purple-200 dark:bg-purple-900",
        text: "text-purple-800 dark:text-purple-300",
        dot: "bg-purple-500"
      },
      green: {
        bg: "bg-green-200 dark:bg-green-900",
        text: "text-green-800 dark:text-green-300",
        dot: "bg-green-500"
      }
    };
    const colorClass = colorClasses[color];
    
    return (
      <div 
        className="relative overflow-x-auto scroll-snap-x mandatory" 
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
            onMouseEnter={() => setAnimationState(prev => ({...prev, [section]: 'slowed'}))}
            onMouseLeave={() => {
              if (!hoveredPill[section]) {
                setAnimationState(prev => ({...prev, [section]: 'running'}));
              }
            }}
          >
            {/* First set */}
            {useCases.map((useCase, index) => (
              <div 
                key={`${section}-${index}`} 
                className="inline-flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 min-w-max scroll-snap-start use-case-pill"
                role="listitem"
                onMouseEnter={() => {
                  setHoveredPill(prev => ({...prev, [section]: true}));
                  setAnimationState(prev => ({...prev, [section]: 'paused'}));
                }}
                onMouseLeave={() => {
                  setHoveredPill(prev => ({...prev, [section]: false}));
                  setAnimationState(prev => ({...prev, [section]: 'slowed'}));
                  // After a short delay, resume normal animation if the mouse is not over the section
                  setTimeout(() => {
                    setAnimationState(prev => {
                      if (prev[section] === 'slowed') {
                        return {...prev, [section]: 'running'};
                      }
                      return prev;
                    });
                  }, 1000);
                }}
              >
                <div className="flex items-center">
                  <span className={`w-3 h-3 ${colorClass.dot} rounded-full mr-3`} aria-hidden="true"></span>
                  <span className="text-gray-800 dark:text-gray-200 whitespace-nowrap font-medium text-base md:text-lg">
                    {useCase}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Duplicate for infinite scroll */}
            {useCases.map((useCase, index) => (
              <div 
                key={`${section}-dup-${index}`} 
                className="inline-flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 min-w-max scroll-snap-start use-case-pill"
                role="listitem"
                onMouseEnter={() => {
                  setHoveredPill(prev => ({...prev, [section]: true}));
                  setAnimationState(prev => ({...prev, [section]: 'paused'}));
                }}
                onMouseLeave={() => {
                  setHoveredPill(prev => ({...prev, [section]: false}));
                  setAnimationState(prev => ({...prev, [section]: 'slowed'}));
                  // After a short delay, resume normal animation if the mouse is not over the section
                  setTimeout(() => {
                    setAnimationState(prev => {
                      if (prev[section] === 'slowed') {
                        return {...prev, [section]: 'running'};
                      }
                      return prev;
                    });
                  }, 1000);
                }}
              >
                <div className="flex items-center">
                  <span className={`w-3 h-3 ${colorClass.dot} rounded-full mr-3`} aria-hidden="true"></span>
                  <span className="text-gray-800 dark:text-gray-200 whitespace-nowrap font-medium text-base md:text-lg">
                    {useCase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Icons for categories
  const personalIcon = (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 21C3 18.2386 7.02944 16 12 16C16.9706 16 21 18.2386 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const teamsIcon = (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20H7M17 20C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4M17 20V6C17 4.89543 16.1046 4 15 4H7M7 20C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8Z" fill="currentColor"/>
      <path d="M15 12C15 12.5523 14.5523 13 14 13C13.4477 13 13 12.5523 13 12C13 11.4477 13.4477 11 14 11C14.5523 11 15 11.4477 15 12Z" fill="currentColor"/>
      <path d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z" fill="currentColor"/>
      <path d="M11 12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11C10.5523 11 11 11.4477 11 12Z" fill="currentColor"/>
      <path d="M11 16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16C9 15.4477 9.44772 15 10 15C10.5523 15 11 15.4477 11 16Z" fill="currentColor"/>
    </svg>
  );

  const businessIcon = (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700 overflow-hidden use-cases-section">
      <div className="w-full px-0">
    {/* Section heading with enhanced typography */}
{/* Modern section heading with gradient typography */}
<div className="text-center mb-16 px-6 md:px-8 max-w-4xl mx-auto">
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      The Emerging Collaborative AI Ecosystem
    </span>
  </h2>
  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
    Examples of meaningful human-AI collaboration across different domains.
  </p>
  <div className="inline-block relative">
    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform">
      What will be your AI moment?
    </p>
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 -z-10"></div>
  </div>
</div>

        {/* Section description */}
        
        {/* Multi-row marquee with dedicated sections */}
        <div className="space-y-4" role="list" aria-label="Use cases by category">
          {/* Personal Row */}
          {renderCategoryRow(
            "Personal", 
            personalIcon, 
            "blue", 
            personalUseCases, 
            false, 
            personalRef as React.RefObject<HTMLDivElement>, 
            "personal"
          )}
          
          {/* Teams Row */}
          {renderCategoryRow(
            "Teams", 
            teamsIcon, 
            "purple", 
            teamUseCases, 
            true, 
            teamsRef as React.RefObject<HTMLDivElement>, 
            "teams"
          )}
          
          {/* Business Row */}
          {renderCategoryRow(
            "Business", 
            businessIcon, 
            "green", 
            businessUseCases, 
            false, 
            businessRef as React.RefObject<HTMLDivElement>, 
            "business"
          )}
        </div>
        
        {/* Call to action */}
        <div className="mt-10 text-center">
          <a 
            href="/collaborative-ai" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg transition-colors"
            aria-label="Learn more about Collaborative AI"
          >
            <span>Learn more about Collaborative AI</span>
            <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
