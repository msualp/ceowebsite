'use client';

import { useState, useEffect, useRef } from 'react';
import { HiSparkles, HiCommandLine } from 'react-icons/hi2';
import TypingEffect from './TypingEffect';

const MissionCapsule = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const capsuleRef = useRef<HTMLDivElement | null>(null);
  const autoRestartIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start the animation when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay the animation start by 2.5 seconds to catch user's attention with blank terminal
          setTimeout(() => {
            setAnimationStep(1); // Start first line
          }, 2500);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (capsuleRef.current) {
      observer.observe(capsuleRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Set up automatic animation restart every few minutes
  useEffect(() => {
    // Only set up the interval if animation has completed (step 4)
    if (animationStep === 4) {
      // Restart animation every 3 minutes (180000 ms)
      autoRestartIntervalRef.current = setInterval(() => {
        restartAnimation();
      }, 180000); // 3 minutes
    }
    
    // Clean up interval on unmount or when animation step changes
    return () => {
      if (autoRestartIntervalRef.current) {
        clearInterval(autoRestartIntervalRef.current);
      }
    };
  }, [animationStep]);

  // Handle animation restart
  const restartAnimation = () => {
    setIsRestarting(true);
    setAnimationStep(0);
    
    // Longer delay (2 seconds) before starting animation after restart
    // to show blank terminal screen for a moment
    setTimeout(() => {
      setAnimationStep(1);
      setIsRestarting(false);
    }, 2000);
  };

  return (
    <div 
      ref={capsuleRef}
      className="relative max-w-3xl mx-auto px-6 py-12 overflow-hidden"
    >
      <h2 className="sr-only">Mission</h2>
      {/* Terminal Window */}
      <div 
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform perspective-1000 transition-all duration-300 ${isHovered ? 'scale-[1.01] shadow-md dark:shadow-gray-800/30' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Terminal Header */}
        <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            mission.sh — bash — 80×24
          </div>
          <button 
            onClick={restartAnimation}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            title="Restart animation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Terminal Content - Fixed height with revised spacing */}
        <div className="p-6 font-mono text-sm md:text-base bg-gray-100 dark:bg-gray-950 relative h-[260px] md:h-[280px] overflow-y-auto flex flex-col">
          {/* Terminal background subtle pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(#000 1px, transparent 0)', 
                 backgroundSize: '20px 20px' 
               }}>
          </div>
          
          {/* Command prompt */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 flex-shrink-0">
            <span className="mr-2">user@sociail</span>
            <span className="mr-2 text-blue-500 dark:text-blue-400">~</span>
            <span className="text-green-600 dark:text-green-400">$</span>
            <span className="ml-2 text-black dark:text-white flex items-center gap-1">
              <HiCommandLine className="text-green-600 dark:text-green-500" />
              ./mission.sh
            </span>
            {isRestarting && (
              <span className="ml-3 text-xs text-gray-400 dark:text-gray-500 animate-pulse">
                Restarting...
              </span>
            )}
          </div>
          
          {/* Blinking cursor when terminal is blank (step 0) */}
          {animationStep === 0 && (
            <div className="h-5 flex items-center">
              <span className="w-2.5 h-4 bg-gray-600 dark:bg-gray-400 animate-blink"></span>
            </div>
          )}
          
          {/* Step 1: First line - explicitly showing different states */}
          {animationStep === 1 && (
            <div className="font-mono text-green-600 dark:text-green-400 mb-2 flex items-center flex-shrink-0">
              <HiSparkles className="mr-2 animate-pulse" />
              <TypingEffect 
                text="Initializing mission statement..." 
                delay={60} 
                onComplete={() => {
                  // Add a small delay before showing the next line
                  setTimeout(() => {
                    setAnimationStep(2);
                  }, 300);
                }}
              />
            </div>
          )}
          {animationStep > 1 && (
            <div className="font-mono text-green-600 dark:text-green-400 mb-3 flex items-center">
              <HiSparkles className="mr-2 animate-pulse" />
              <span>Initializing mission statement...</span>
            </div>
          )}
          
          {/* Step 2: Divider and second line */}
          {animationStep >= 2 && (
            <>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent my-2 animate-pulse"></div>
              <div className="text-black dark:text-white text-xl md:text-2xl font-bold mb-2">
                {animationStep === 2 && (
                  <TypingEffect 
                    text="Rewire how humans and AIs collaborate — with purpose, clarity, and creativity." 
                    delay={80} 
                    cursorBlinkSpeed={530}
                    onComplete={() => {
                      setTimeout(() => {
                        setAnimationStep(3);
                      }, 400);
                    }}
                  />
                )}
                {animationStep > 2 && (
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 bg-clip-text text-transparent">
                    Rewire how humans and AIs collaborate — with purpose, clarity, and creativity.
                  </span>
                )}
              </div>
            </>
          )}
          
          {/* Step 3: Final line */}
          {animationStep >= 3 && (
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              {animationStep === 3 && (
                <TypingEffect 
                  text="Mission loaded successfully. Execution in progress..." 
                  delay={60} 
                  cursorBlinkSpeed={530}
                  onComplete={() => {
                    setAnimationStep(4);
                  }}
                />
              )}
              {animationStep > 3 && (
                <div className="flex items-center">
                  <span className="mr-2">Mission loaded successfully. Execution in progress</span>
                  <span className="inline-flex">
                    <span className="animate-pulse delay-100">.</span>
                    <span className="animate-pulse delay-200">.</span>
                    <span className="animate-pulse delay-300">.</span>
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Spacer to push content to the top - reduced/eliminated */}
          
          {/* Status indicators - only show when animation is complete */}
          {animationStep >= 4 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">Purpose: Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">Clarity: Optimal</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">Creativity: Flowing</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Elements - Reduced intensity */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500/10 dark:bg-green-700/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/10 dark:bg-blue-700/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className={`absolute bottom-10 left-10 w-16 h-16 bg-purple-500/5 dark:bg-purple-700/5 rounded-full blur-xl ${isHovered ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDelay: '0.8s', animationDuration: '3s' }}></div>
    </div>
  );
};

export default MissionCapsule;
