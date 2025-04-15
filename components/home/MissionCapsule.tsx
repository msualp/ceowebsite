'use client';
import React, { useState, useEffect, useRef } from 'react';
import { HiSparkles, HiCommandLine } from 'react-icons/hi2';
import TypingEffect from './TypingEffect';
import Modal from '@/components/ui/Modal';

const MissionCapsule: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [initialStep, setInitialStep] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showResumed, setShowResumed] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const capsuleRef = useRef<HTMLDivElement | null>(null);
  const autoRestartIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);
  const powerAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const resumeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedStep = localStorage.getItem('mission-step');
    if (savedStep !== null) {
      setInitialStep(Number(savedStep));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          powerAudioRef.current?.play().catch(() => {});
          setTimeout(() => {
            setAnimationStep(1);
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

  useEffect(() => {
    const preload = () => {
      typingAudioRef.current?.load();
      powerAudioRef.current?.load();
      clickAudioRef.current?.load();
      resumeAudioRef.current?.load();
    };
    window.addEventListener('mouseover', preload, { once: true });
    return () => window.removeEventListener('mouseover', preload);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('mission-mute');
    if (saved !== null) setIsMuted(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('mission-mute', isMuted.toString());
  }, [isMuted]);

  useEffect(() => {
    if (animationStep === 1 && typingAudioRef.current) {
      const audio = typingAudioRef.current;
      audio.volume = 0;
      audio.loop = true;
      audio.play().catch(() => {});
      
      let volume = 0;
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.05) {
          volume += 0.01;
          audio.volume = Math.min(0.05, volume);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }
  }, [animationStep]);

  useEffect(() => {
    if (animationStep === 4 && !isRestarting) {
      autoRestartIntervalRef.current = setInterval(() => {
        restartAnimation();
      }, 180000);
    }

    return () => {
      if (autoRestartIntervalRef.current) {
        clearInterval(autoRestartIntervalRef.current);
        autoRestartIntervalRef.current = null;
      }
    };
  }, [animationStep, isRestarting]);

  const restartAnimation = () => {
    if (animationStep === 0 || isRestarting) return;
    localStorage.removeItem('mission-step');
    setIsRestarting(true);
    setAnimationStep(0);
    setTimeout(() => {
      setAnimationStep(1);
      setIsRestarting(false);
    }, 2000);
  };

  const updateAnimationStep = (nextStep: number) => {
    setAnimationStep(nextStep);
    localStorage.setItem('mission-step', nextStep.toString());
  };

  return (
  <div className="mission-capsule-wrapper bg-[#2a2a2a] text-white py-12">
      <div 
        ref={capsuleRef}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 overflow-hidden"
      >
        <h2 className="sr-only">Mission</h2>
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 transition transform ease-out duration-300 ${showResumed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Resumed
        </div>
        <audio ref={typingAudioRef} src="/sounds/typing.mp3" preload="auto" muted={isMuted} />
        <audio ref={powerAudioRef} src="/sounds/powerup.mp3" preload="auto" />
        <audio ref={clickAudioRef} src="/sounds/click.mp3" preload="auto" />
        <audio ref={resumeAudioRef} src="/sounds/resume.mp3" preload="auto" />
        <div 
          className={`bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform perspective-1000 transition-all duration-300 ${hasAppeared ? 'screen-flicker opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-gray-700 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
              <div className="text-xs text-gray-400 font-mono">
              mission.sh — bash — 80×24
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => {
                  clickAudioRef.current?.play().catch(() => {});
                  restartAnimation();
                }}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Restart animation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform transition-transform duration-300 ease-in-out hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  clickAudioRef.current?.play().catch(() => {});
                  setIsMuted(!isMuted);
                }}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ml-2 group"
                title={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <svg className="h-3.5 w-3.5 transform transition-transform duration-200 ease-in-out group-hover:rotate-6 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 9v6h4l5 5V4l-5 5H9z" />
                    <line x1="18" y1="6" x2="22" y2="10" stroke="white" strokeWidth="2" />
                    <line x1="22" y1="6" x2="18" y2="10" stroke="white" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 transform transition-transform duration-200 ease-in-out group-hover:rotate-6 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
        <div className="px-4 sm:px-6 pt-4 pb-1 text-xs sm:text-sm md:text-base font-mono bg-[#1a1a1a] dark:bg-gray-950 relative min-h-[240px] sm:min-h-[280px] max-h-[400px] overflow-x-auto overflow-y-visible flex flex-col justify-start">
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" 
                 style={{ 
                   backgroundImage: 'radial-gradient(#000 1px, transparent 0)', 
                   backgroundSize: '20px 20px' 
                 }}>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 flex-shrink-0">
              <span className="mr-2">user@sociail</span>
              <span className="mr-2 text-blue-500 dark:text-blue-400">~</span>
              <span className="text-green-600 dark:text-green-400">$</span>
              <span className="ml-2 text-white flex items-center gap-1">
                <HiCommandLine className="text-green-600 dark:text-green-500" />
                ./mission.sh
              </span>
              {isRestarting && (
                <span className="ml-3 text-xs text-gray-400 dark:text-gray-500 animate-pulse">
                  Restarting...
                </span>
              )}
            </div>
            
            {hasAppeared && animationStep === 0 && (
              <div>
                <div className="text-green-500/60 font-mono animate-flicker">BOOTING SYSTEM...</div>
                <div className="text-green-500/40 font-mono animate-flicker delay-300">LOADING MODULES...</div>
                <div className="text-green-500/20 font-mono animate-flicker delay-500">INITIALIZING...</div>
              </div>
            )}

            {initialStep !== null && animationStep === 0 && !isRestarting && (
              <div className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer mt-2 hover:underline" onClick={() => {
                setAnimationStep(initialStep);
                setShowResumed(true);
                resumeAudioRef.current?.play().catch(() => {});
                setTimeout(() => setShowResumed(false), 3000);
              }}>
                Resume from last step
              </div>
            )}
            
            {animationStep === 0 && (
              <div className="h-5 flex items-center">
                <span className="w-2.5 h-4 bg-gray-600 dark:bg-gray-400 animate-blink"></span>
              </div>
            )}
            
            {animationStep === 1 && (
              <div className="font-mono text-green-600 dark:text-green-400 mb-2 flex items-center flex-shrink-0">
                <HiSparkles className="mr-2 text-green-600 dark:text-green-500 animate-shimmer" />
                <TypingEffect 
                  text="Initializing mission statement..." 
                  delay={60} 
                  onComplete={() => {
                    updateAnimationStep(2);
                  }}
                />
              </div>
            )}
            
            {animationStep > 1 && (
              <div className="font-mono text-green-600 dark:text-green-400 mb-3 flex items-center">
                <HiSparkles className="mr-2 text-green-600 dark:text-green-500 animate-shimmer" />
                <span>Initializing mission statement...</span>
              </div>
            )}
            
            {animationStep >= 2 && (
              <div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent my-2 animate-pulse"></div>
                <div className="text-white text-xl md:text-2xl font-bold mb-2">
                  {animationStep === 2 ? (
                    <TypingEffect 
                      text="Rewire how humans and AIs collaborate — with purpose, clarity, and creativity." 
                      delay={80} 
                      cursorBlinkSpeed={530}
                      onComplete={() => {
                        updateAnimationStep(3);
                      }}
                    />
                  ) : (
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 bg-clip-text text-transparent">
                      Rewire how humans and AIs collaborate — with purpose, clarity, and creativity.
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {animationStep >= 3 && (
              <div className="text-gray-600 dark:text-gray-400 mt-2">
                {animationStep === 3 ? (
                  <TypingEffect 
                    text="Mission loaded successfully. Execution in progress..." 
                    delay={60} 
                    cursorBlinkSpeed={530}
                    onComplete={() => {
                      updateAnimationStep(4);
                    }}
                  />
                ) : (
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
            
            {animationStep >= 4 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)] animate-pulse-slow"></div>
                  <span className="text-white">Purpose: Active</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_6px_2px_rgba(59,130,246,0.5)] animate-pulse-slow"></div>
                  <span className="text-white">Clarity: Optimal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-2 shadow-[0_0_6px_2px_rgba(139,92,246,0.5)] animate-pulse-slow"></div>
                  <span className="text-white">Creativity: Flowing</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* <Modal
          show={showConfirmReset}
          onClose={() => setShowConfirmReset(false)}
          title="Restart Mission?"
          description="Are you sure you want to restart the mission from the beginning?"
          actions={
            <>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  restartAnimation();
                }}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition"
              >
                Restart
              </button>
            </>
          }
        /> */}
        
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500/10 dark:bg-green-700/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/10 dark:bg-blue-700/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute bottom-10 left-10 w-16 h-16 bg-purple-500/5 dark:bg-purple-700/5 rounded-full blur-xl ${isHovered ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDelay: '0.8s', animationDuration: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MissionCapsule;
