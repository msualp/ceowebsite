'use client';

import { useState, ReactNode } from 'react';
import Image from 'next/image';
import { HiLightBulb } from 'react-icons/hi2';

interface TimelineEntryProps {
  company: string;
  role: string;
  period: string;
  description: string[];
  highlight: string;
  logo?: string;
  index?: number;
}

export default function TimelineEntry({
  company,
  role,
  period,
  description,
  highlight,
  logo,
  index = 0
}: TimelineEntryProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="timeline-entry fade-in-scroll"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative pl-16">
        {/* Timeline node */}
        <div className="absolute left-0 top-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-600 dark:border-blue-500 flex items-center justify-center shadow-md">
          {logo ? (
            <div className="group relative">
              <Image 
                src={logo} 
                alt={company} 
                width={30} 
                height={30} 
                className="rounded-xl shadow-lg object-cover w-full h-auto img-grayscale"
              />
            </div>
          ) : (
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
              <HiLightBulb className="w-6 h-6" />
            </div>
          )}
        </div>
        
        {/* Content card */}
        <div className="hover-lift mac-glass p-8 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{company}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{role}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full text-sm font-medium">
                {period}
              </span>
            </div>
          </div>
          
          {/* Highlight quote */}
          <div className="border-l-4 border-blue-500 pl-4 italic text-blue-700 dark:text-blue-300 mb-4">
            "{highlight}"
          </div>
          
          {showDetails && (
            <div className="space-y-2 text-gray-700 dark:text-gray-300 fade-in-scroll">
              {description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 underline icon-hover"
          >
            {showDetails ? "Hide Details" : "View Highlights"}
          </button>
        </div>
      </div>
    </div>
  );
}
