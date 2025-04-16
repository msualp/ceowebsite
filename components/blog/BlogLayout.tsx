'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import PageContainer from '@/components/PageContainer';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import LazyNewsletterForm from '@/components/lazy/LazyNewsletterForm';

export interface BlogLayoutProps {
  /** Page title */
  title: string;
  /** Page subtitle */
  subtitle?: string;
  /** Main content */
  children: ReactNode;
  /** Hero section content */
  hero?: ReactNode;
  /** Sidebar content */
  sidebar?: ReactNode;
  /** Newsletter section title */
  newsletterTitle?: string;
  /** Newsletter section subtitle */
  newsletterSubtitle?: string;
  /** Whether to show the newsletter section */
  showNewsletter?: boolean;
  /** Whether to show the back to insights link */
  showBackLink?: boolean;
  /** Additional CSS classes for the main content */
  contentClassName?: string;
  /** Additional CSS classes for the sidebar */
  sidebarClassName?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * BlogLayout component for shared layout across blog pages
 */
export default function BlogLayout({
  title,
  subtitle,
  children,
  hero,
  sidebar,
  newsletterTitle = 'Stay in the Loop',
  newsletterSubtitle = 'Join our newsletter to receive the latest insights on AI, leadership, and productivity.',
  showNewsletter = true,
  showBackLink = true,
  contentClassName = '',
  sidebarClassName = '',
  className = '',
}: BlogLayoutProps) {
  return (
    <PageContainer title={title} className={className}>
      {/* Hero Section */}
      {hero && (
        <div className="mb-12">
          {hero}
        </div>
      )}
      
      {/* Page Title */}
      {!hero && (
        <SectionTitle 
          title={title} 
          subtitle={subtitle}
          className="mb-8"
        />
      )}
      
      {/* Back to Insights Link */}
      {showBackLink && (
        <div className="mb-6">
          <Link 
            href="/insights" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            Back to Insights
          </Link>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Content Area */}
        <div className={`lg:w-2/3 ${contentClassName}`}>
          {children}
        </div>
        
        {/* Sidebar */}
        {sidebar && (
          <div className={`lg:w-1/3 space-y-8 ${sidebarClassName}`}>
            {sidebar}
          </div>
        )}
      </div>
      
      {/* Newsletter Section */}
      {showNewsletter && (
        <Section background="light" spacing="md" className="mt-12 rounded-xl mac-glass border border-blue-50 dark:border-blue-900/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 blur-2xl rounded-full"></div>
          
          <SectionTitle 
            title={newsletterTitle} 
            subtitle={newsletterSubtitle}
            className="mb-6"
          />
          
          <div className="max-w-md mx-auto relative">
            <LazyNewsletterForm />
          </div>
        </Section>
      )}
    </PageContainer>
  );
}

/**
 * BlogSidebar component for common sidebar elements
 */
export function BlogSidebar({
  popularArticles,
  showContactSection = true,
  showAboutSection = true,
  className = '',
}: {
  popularArticles?: { title: string; slug: string }[];
  showContactSection?: boolean;
  showAboutSection?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Get in Touch Section */}
      {showContactSection && (
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
            <Button 
              href="https://calendly.com/mustafasualp/30min"
              variant="primary"
              size="sm"
              fullWidth
              external
            >
              Schedule a Call
            </Button>
            <Button 
              href="https://www.linkedin.com/in/sualp/"
              variant="outline"
              size="sm"
              fullWidth
              icon={<HiArrowLongRight className="w-4 h-4" />}
              iconPosition="right"
              external
            >
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      )}
      
      {/* About Sociail Section */}
      {showAboutSection && (
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
            iconPosition="right"
          >
            Learn More
          </Button>
        </div>
      )}
      
      {/* Popular Articles Section */}
      {popularArticles && popularArticles.length > 0 && (
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
            {popularArticles.map((article, index) => (
              <li key={index} className="group">
                <Link href={`/insights/${article.slug}`} className="flex items-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400">→</span>
                  <span className="flex-1">{article.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
