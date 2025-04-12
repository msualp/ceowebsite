'use client';

import { ReactNode } from 'react';
import { CirclePattern } from './SvgShapes';
import SkipToContent from './SkipToContent';
import ClientSEO from './ClientSEO';
import { HeadingProvider, Heading } from './HeadingContext';
import ReactMarkdown from 'react-markdown';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  withPattern?: boolean;
  className?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export function PageContainer({ 
  children, 
  title, 
  subtitle,
  description,
  withPattern = true,
  className = '',
  type = 'website',
  image,
  publishedAt,
  updatedAt
}: PageContainerProps) {
  return (
    <>
      <SkipToContent />
      <ClientSEO 
        title={title}
        description={description}
        type={type}
        image={image}
        publishedAt={publishedAt}
        updatedAt={updatedAt}
      />
      <HeadingProvider initialLevel={1}>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 ${className}`}>
          {title && <Heading className="text-4xl font-bold mb-6">{title}</Heading>}
          {subtitle && (
            <ReactMarkdown
              className="text-lg text-gray-500 dark:text-gray-400 mb-4 animate-fadeIn"
            >
              {subtitle}
            </ReactMarkdown>
          )}
          
          <div id="main-content" className="glass relative p-8 rounded-xl shadow-xl mb-8 overflow-hidden">
            {withPattern && (
              <div className="absolute inset-0 text-blue-600 dark:text-blue-300 opacity-5 pointer-events-none">
                <CirclePattern />
              </div>
            )}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </HeadingProvider>
    </>
  );
}
export default PageContainer;
