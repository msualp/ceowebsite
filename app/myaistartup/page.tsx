'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import HoverRevealImage from '@/components/ui/HoverRevealImage';
import { HiPlay, HiClock, HiCalendar, HiFilm, HiUserGroup, HiSparkles } from 'react-icons/hi2';

// Trailer Modal Component
interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrailerModal = ({ isOpen, onClose }: TrailerModalProps) => {
  // Add console log for debugging
  console.log('TrailerModal rendered, isOpen:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-black rounded-xl overflow-hidden max-w-5xl w-full aspect-video relative animate-scaleIn"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          aria-label="Close trailer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Trailer video placeholder */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-xl mb-4">Trailer coming soon</p>
            <p className="text-gray-400">The official trailer will be released in May 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// CountdownTimer Component
interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  [key: string]: number | undefined;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-2 md:px-6 md:py-4 rounded-lg text-center w-16 md:w-24">
            <span className="text-2xl md:text-4xl font-bold text-white">
              {timeLeft[interval] !== undefined ? String(timeLeft[interval]).padStart(2, '0') : '00'}
            </span>
          </div>
          <span className="text-xs md:text-sm text-blue-300 mt-1 uppercase tracking-wide">{interval}</span>
        </div>
      ))}
    </div>
  );
};

export default function AIStartupMoviePage() {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  
  // Add console log for debugging
  console.log('AIStartupMoviePage rendered, isTrailerModalOpen:', isTrailerModalOpen);
  
  // Sample quotes about the documentary
  const quotes = [
    {
      text: "A groundbreaking experiment in transparency and AI collaboration, documenting the highs and lows of startup life in real-time.",
      author: "Coming in 2025"
    },
    {
      text: "An unprecedented look at what it takes to build an AI company from the ground up, with AI itself as part of the storytelling process.",
      author: "Director's Note"
    },
    {
      text: "Not just a documentary about AI, but one created with AI—a meta-narrative that pushes the boundaries of collaborative filmmaking.",
      author: "Production Team"
    }
  ];
  
  // Documentary details
  const docDetails = [
    {
      icon: <HiClock className="w-5 h-5" />,
      label: "Runtime",
      value: "6-Part Series"
    },
    {
      icon: <HiCalendar className="w-5 h-5" />,
      label: "Release Date",
      value: "Winter 2025"
    },
    {
      icon: <HiFilm className="w-5 h-5" />,
      label: "Format",
      value: "Documentary Series"
    },
    {
      icon: <HiUserGroup className="w-5 h-5" />,
      label: "Team",
      value: "Humans + AI Collaboration"
    }
  ];
  
  // Handle waitlist signup form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, you would send this to your backend
    console.log('Email submitted:', email);
    setIsEmailSubmitted(true);
  };
  
  return (
    <PageContainer title="The AI Startup Movie">
      {/* Hero Section with Trailer */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background video/image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
          <Image
            src="/images/sociail_dark_static_bg_far_faded_no_clouds.png"
            alt="Documentary background"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Coming soon badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full mb-6 animate-pulse">
            <HiSparkles className="mr-2" />
            COMING Winter 2025
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="block">The AI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Startup Movie
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            The world's first documentary capturing the entire journey of building an AI company—from vision to reality—co-directed by AI itself.
          </p>
          
          <div className="mb-12">
            <button
              onClick={() => {
                console.log('Watch Teaser Trailer button clicked');
                setIsTrailerModalOpen(true);
              }}
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group"
            >
              <span className="mr-2 bg-white text-blue-600 rounded-full p-1 transform group-hover:scale-110 transition-transform">
                <HiPlay className="w-4 h-4" />
              </span>
              Watch Teaser Trailer
            </button>
          </div>
          
          {/* Countdown timer */}
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-lg text-gray-300 mb-4">Premiere Countdown</h3>
            <CountdownTimer targetDate="2026-03-20T00:00:00" />
          </div>
        </div>
      </section>
      
      {/* About The Documentary */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-12">
              {/* Documentary poster */}
              <div className="w-full md:w-1/3">
                <HoverRevealImage
                  src="/images/sociail-team-line-up.jpeg"
                  alt="Sociail team walking lineup"
                  captionTitle="Early Days: Building with Vision"
                  captionText="A symbolic first walk together—united by purpose, walking toward something bold."
                  aspectRatio="aspect-[2/3]"
                />
                
                {/* Documentary details */}
                <div className="mt-8 bg-black/50 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Documentary Details</h3>
                  <div className="space-y-4">
                    {docDetails.map((detail, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                          {detail.icon}
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm block">{detail.label}</span>
                          <span className="font-medium">{detail.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Documentary description */}
              <div className="w-full md:w-2/3">
                <div className="inline-flex items-center px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-semibold rounded-full mb-4">
                  FIRST-OF-ITS-KIND DOCUMENTARY
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Ultimate Startup Transparency Experiment</h2>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p>
                    In 2023, we made an unprecedented decision: to document every single moment of building Sociail—from initial concept to market launch—creating the most transparent startup documentary ever made.
                  </p>
                  
                  <p>
                    But with a twist. In a groundbreaking approach to filmmaking, we're not just documenting the creation of an AI company—we're using AI as a collaborative partner in making the documentary itself.
                  </p>
                  
                  <h3>More Than Just a Documentary</h3>
                  
                  <p>
                    Through thousands of hours of meetings, decisions, failures, and breakthroughs, we're capturing the unfiltered reality of building a startup in the AI age. Nothing is off-limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join The Waitlist */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Be The First To Watch</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our exclusive waitlist to get early access to the documentary, behind-the-scenes content, and special premiere events.
            </p>
            
            {isEmailSubmitted ? (
              <div className="bg-green-900/30 backdrop-blur-sm border border-green-500 text-green-300 px-6 py-8 rounded-xl animate-fadeIn">
                <HiSparkles className="w-10 h-10 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p>
                  Thank you for joining our waitlist. We'll keep you updated on the documentary's progress and let you know when premiere tickets become available.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-blue-300 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/10 border border-blue-900/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Join The Waitlist
                  </button>
                  <p className="text-sm text-gray-400">
                    We'll never share your email with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>

      <div className="relative mt-24 max-w-4xl mx-auto fade-in-scroll">
        <HoverRevealImage
          src="/images/sociail-team-early-outing.png"
          alt="Sociail team early outing"
          captionTitle="Behind the Scenes — Early Team Outing"
          captionText="Moments of reflection, bonding, and planning the road ahead together as humans and AI."
          aspectRatio="aspect-video"
        />
      </div>



        </div>
      </section>
      
      {/* Trailer Modal */}
      <TrailerModal isOpen={isTrailerModalOpen} onClose={() => setIsTrailerModalOpen(false)} />
      
      
    </PageContainer>
  );
}
