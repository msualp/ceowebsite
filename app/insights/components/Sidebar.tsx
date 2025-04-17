'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import Button from '@/components/Button';
import { CTAGroup } from '@/components/cta/CTAGroup';
import { Button as CTAButton } from '@/components/cta/Button';
import { Article } from '@/types/blog';

interface SidebarProps {
  /** Popular articles to display */
  popularArticles?: Article[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Sidebar component for the insights page
 */
export default function Sidebar({ popularArticles, className = '' }: SidebarProps) {
  // Default popular articles if none provided
  const articles = popularArticles || [
    {
      slug: 'precision-and-alignment',
      title: 'Precision and Alignment: Great Lesson from Mentor',
      date: '2025-04-09'
    },
    {
      slug: 'lessons-from-bootstrapping',
      title: 'Lessons from Bootstrapping AEFIS',
      date: '2025-04-07'
    },
    {
      slug: 'real-time-ai-collaboration',
      title: 'The Rise of Real-Time AI Collaboration',
      date: '2025-04-04'
    }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Contact Section */}
      <div className="mac-glass p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800/40">
        <h4 className="text-lg font-bold mb-3 flex items-center">
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 p-1.5 rounded-lg mr-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10H5C3.895 10 3 9.105 3 8C3 6.895 3.895 6 5 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6H19C20.105 6 21 6.895 21 8C21 9.105 20.105 10 19 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 15C7 18.314 9.686 21 13 21C16.314 21 19 18.314 19 15H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.7573 10.24C15.4505 10.24 16.8237 8.86681 16.8237 7.17359C16.8237 5.48038 15.4505 4.10718 13.7573 4.10718C12.064 4.10718 10.6908 5.48038 10.6908 7.17359" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16.6638 7.06633L18.8014 4.92873" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          Get in Touch
        </h4>
        <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
          Interested in discussing AI collaboration or entrepreneurship?
        </p>
        <div className="space-y-2">
          <CTAGroup 
            variant="compact" 
            primaryCTA="calendly" 
            secondaryCTA="none" 
            direction="column"
          />
          <CTAButton 
            href="https://www.linkedin.com/in/sualp/"
            variant="linkedin"
            size="sm"
            fullWidth
            rightIcon={<HiArrowLongRight className="w-4 h-4" />}
            external
          >
            Connect on LinkedIn
          </CTAButton>
          <CTAButton 
            href="mailto:msualp@sociail.com"
            variant="outline"
            size="sm"
            fullWidth
            external
          >
            Email Me
          </CTAButton>
        </div>
      </div>
      
      {/* About Sociail Section */}
      <div className="mac-glass p-6 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl rounded-full"></div>
        
        <h4 className="text-lg font-bold mb-3 flex items-center">
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 p-1.5 rounded-lg mr-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3H16.5C18.985 3 21 5.015 21 7.5C21 9.985 18.985 12 16.5 12H3V7.5C3 5.015 5.015 3 7.5 3H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21H7.5C5.015 21 3 18.985 3 16.5C3 14.015 5.015 12 7.5 12H21V16.5C21 18.985 18.985 21 16.5 21H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 15.5C8.32843 15.5 9 14.8284 9 14C9 13.1716 8.32843 12.5 7.5 12.5C6.67157 12.5 6 13.1716 6 14C6 14.8284 6.67157 15.5 7.5 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 9.5C17.3284 9.5 18 8.82843 18 8C18 7.17157 17.3284 6.5 16.5 6.5C15.6716 6.5 15 7.17157 15 8C15 8.82843 15.6716 9.5 16.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          About Sociail
        </h4>
        <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
          Discover how we're redefining AI collaboration for teams and transforming how organizations work together.
        </p>
        <Button 
          href="/sociail" 
          variant="primary"
          size="sm"
          fullWidth
          className="mb-2"
          icon={<HiArrowLongRight className="w-4 h-4" />}
        >
          Learn More
        </Button>
      </div>
      
      {/* Popular Articles Section */}
      <div className="mac-glass p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800/40">
        <h4 className="text-lg font-bold mb-3 flex items-center">
          <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 p-1.5 rounded-lg mr-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19H8C5.791 19 4 17.209 4 15V12C4 9.791 5.791 8 8 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 8H16C18.209 8 20 9.791 20 12V15C20 17.209 18.209 19 16 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 12L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 15L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 9L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          Popular Articles
        </h4>
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.slug} className="group">
              <Link href={`/insights/${article.slug}`} className="flex items-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400">→</span>
                <span className="flex-1">{article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
