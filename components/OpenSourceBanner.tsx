'use client';

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export const OpenSourceBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Github className="w-6 h-6" />
          <p className="text-sm md:text-base font-medium">
            This website is open source! View the code, contribute, or fork it for your own use.
            <Link href="/take-it" className="ml-2 underline hover:text-blue-100">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="https://github.com/msualp/ceowebsite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View on GitHub
          </Link>
          <Link 
            href="/take-it" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Use This Template
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceBanner;
