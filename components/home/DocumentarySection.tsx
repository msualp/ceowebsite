'use client';

import Image from 'next/image';
import { HiArrowLongRight, HiFilm, HiSpeakerWave } from 'react-icons/hi2';
import Section from '@/components/Section';
import { useState, useEffect } from 'react';
import Link from 'next/link';
const track = (event: string) => console.log(`[Analytics] ${event}`);
import NewsletterForm from '@/components/NewsletterForm';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentarySection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section background="dark" spacing="md">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative">
          <div 
            className="flex flex-col lg:flex-row items-center gap-8 fade-in-scroll backdrop-blur-sm bg-black/30 p-4 sm:p-8 rounded-2xl border border-white/10"
            style={{
              transform: `translateY(${Math.min(scrollPosition * 0.05, 20)}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Video Preview Section */}
            <div 
              className="w-full lg:w-1/2 aspect-video relative rounded-xl overflow-hidden group shadow-2xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Removed Real Startup Journey label from here */}
              {/* Mobile view: inside video top-left */}
              <div className="absolute top-4 left-4 z-20 md:hidden">
                <div className="bg-blue-600/80 backdrop-blur-sm text-white py-1.5 px-3 rounded-lg shadow-lg inline-flex items-center gap-2 text-xs">
                  <HiFilm className="w-4 h-4" />
                  <span>Real Startup Journey</span>
                </div>
              </div>
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10`}></div>
              
              <div className="absolute inset-0 bg-black">
                <Image
                  src="/images/sociail-team-early-outing.png"
                  alt="Sociail team outing - Documentary key frame"
                  fill
                  style={{ objectPosition: 'center 92%' }}
                  className="object-cover scale-150 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Video overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                
                {/* Animated pulse */}
                <div className={`absolute inset-0 flex items-center justify-center ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 animate-ping"></div>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30 cursor-pointer"
                  onClick={() => { track('Clicked: Play Documentary'); setShowComingSoon(true); }}
                  role="button"
                  aria-label="Play documentary preview"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { track('Clicked: Play Documentary'); setShowComingSoon(true); } }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Sound wave animation */}
              <div className={`absolute bottom-6 left-6 flex items-center gap-1.5 ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <HiSpeakerWave className="text-white w-4 h-4" />
                <div className="flex items-end h-4 gap-0.5">
                  <div className="w-0.5 h-1 bg-white rounded-full animate-sound-wave"></div>
                  <div className="w-0.5 h-3 bg-white rounded-full animate-sound-wave animation-delay-100"></div>
                  <div className="w-0.5 h-2 bg-white rounded-full animate-sound-wave animation-delay-200"></div>
                  <div className="w-0.5 h-4 bg-white rounded-full animate-sound-wave animation-delay-300"></div>
                  <div className="w-0.5 h-1 bg-white rounded-full animate-sound-wave animation-delay-400"></div>
                </div>
              </div>
              
              {/* "Coming Soon" badge */}
              {showComingSoon && (
                <div className="absolute top-4 right-4 animate-slide-up-fade">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300">Coming Spring 2026</span>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="w-full lg:w-1/2">
              {/* Desktop view: above the title */}
              <div className="mb-2 hidden md:block">
                <div className="bg-blue-600/80 backdrop-blur-sm text-white py-1.5 px-3 rounded-lg shadow-lg inline-flex items-center gap-2 text-sm">
                  <HiFilm className="w-4 h-4" />
                  <span>Real Startup Journey</span>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">The AI Startup Documentary</h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">
                We're documenting every step of the Sociail journey—from ideation to execution—creating the most transparent startup documentary ever made with the help of AI.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl mb-6 border border-white/10 hover:border-white/20 transition-colors duration-300 relative">
                {/* AI-Enhanced floating badge */}
                <div className="absolute -top-3 right-3 z-30 hidden md:block">
                  <div className="bg-purple-600/80 backdrop-blur-sm text-white py-1.is5 px-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
                    <span>Human-AI Collaboration</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="bg-blue-600/30 p-1.5 rounded-lg mr-2">
                    <HiFilm className="w-4 h-4 text-blue-400" />
                  </span>
                  What We're Capturing:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 group">
                    <span className="h-6 w-6 flex items-center justify-center bg-blue-600/20 text-blue-400 rounded-full mt-0.5 group-hover:bg-blue-600/40 transition-colors duration-300">✓</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Every team meeting and key decision moment</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="h-6 w-6 flex items-center justify-center bg-purple-600/20 text-purple-400 rounded-full mt-0.5 group-hover:bg-purple-600/40 transition-colors duration-300">✓</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">AI-assisted transcription and analysis</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="h-6 w-6 flex items-center justify-center bg-blue-600/20 text-blue-400 rounded-full mt-0.5 group-hover:bg-blue-600/40 transition-colors duration-300">✓</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Real stories of triumphs and challenges</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="h-6 w-6 flex items-center justify-center bg-purple-600/20 text-purple-400 rounded-full mt-0.5 group-hover:bg-purple-600/40 transition-colors duration-300">✓</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Collaborative editing with AI directors</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button
                  onClick={() => { track('Clicked: Join Waitlist (Open Modal)'); setShowModal(true); }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 w-full sm:w-auto justify-center group"
                >
                  <span>Join the Waitlist</span>
                  <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <Link href="/myaistartup" onClick={() => track('Clicked: Learn More')} className="text-blue-400 hover:text-blue-300 transition-colors py-2 sm:py-0 w-full sm:w-auto text-center sm:text-left">
                  Learn more
                  <div className="h-0.5 w-0 group-hover:w-full bg-blue-400 transition-all duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add this to your global CSS file */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes sound-wave {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-sound-wave {
          animation: sound-wave 1s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes slide-up-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.5s ease-out forwards;
        }
      `}</style>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8 sm:py-12 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-lg relative text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-400 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-white text-2xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-gray-300 mb-6">Be the first to know when the AI Startup Documentary drops.</p>
              <NewsletterForm onSubmit={() => { setShowModal(false); track('Submitted: Join Waitlist (Newsletter)'); }} />
              <div className="mt-6">
                <Link
                  href="/myaistartup"
                  className="text-blue-400 hover:text-blue-300 underline transition"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default DocumentarySection;
