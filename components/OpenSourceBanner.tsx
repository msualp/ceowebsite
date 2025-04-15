'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Download, X, Star } from 'lucide-react';

export const OpenSourceBanner = ({ 
  githubRepo = "msualp/ceowebsite",
  starCount = null,
  dismissible = true,
  persistDismissal = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [stars, setStars] = useState(starCount);
  const [isLoading, setIsLoading] = useState(starCount === null);
  const storageKey = 'openSourceBannerDismissed';

  // Check local storage on mount to see if banner was previously dismissed
  useEffect(() => {
    if (persistDismissal) {
      const wasDismissed = localStorage.getItem(storageKey) === 'true';
      if (wasDismissed) {
        setIsVisible(false);
      }
    }
  }, [persistDismissal]);

  // Fetch star count from GitHub API if not provided
  useEffect(() => {
    if (starCount === null && githubRepo) {
      const fetchStars = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`https://api.github.com/repos/${githubRepo}`);
          if (response.ok) {
            const data = await response.json();
            setStars(data.stargazers_count);
          }
        } catch (error) {
          console.error('Error fetching GitHub stars:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchStars();
    }
  }, [githubRepo, starCount]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (persistDismissal) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  if (!isVisible) return null;

  const repoUrl = `https://github.com/${githubRepo}`;

  return (
    <div 
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 md:py-4 md:px-6 shadow-md relative animate-fadeIn"
      style={{ animationDuration: '0.5s' }}
    >
      {dismissible && (
        <button 
          onClick={handleDismiss}
          className="absolute right-2 top-2 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 transition-transform hover:scale-110"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          <p className="text-sm md:text-base font-medium">
            This website is open source! View the code, contribute, or fork it for your own use.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-end">
          {stars !== null && !isLoading && (
            <div className="bg-white/10 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )}
          <Link 
            href="/take-it" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 md:flex-auto text-center focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="flex items-center gap-2 justify-center">
              <Download className="w-4 h-4" />
              Find Out More
            </span>
          </Link>
          <Link 
            href={repoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 md:flex-auto text-center focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="View source code on GitHub"
          >
            <span className="flex items-center gap-2 justify-center">
              <Github className="w-4 h-4" />
              View on GitHub
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS or create a style tag in your layout
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.5s ease-out;
// }

export default OpenSourceBanner;