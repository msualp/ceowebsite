'use client';

import { ReactNode } from 'react';
import { CirclePattern } from './SvgShapes';
import { CallToAction } from './CallToAction';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  withPattern?: boolean;
  className?: string;
  withCallToAction?: boolean;
}

export function PageContainer({ 
  children, 
  title, 
  withPattern = true,
  className = '',
  withCallToAction = true
}: PageContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 ${className}`}>
      {title && <h1 className="text-4xl font-bold mb-6">{title}</h1>}
      
      <div className="glass relative p-8 rounded-xl shadow-xl mb-8 overflow-hidden">
        {withPattern && (
          <div className="absolute inset-0 text-blue-600 dark:text-blue-300 opacity-5 pointer-events-none">
            <CirclePattern />
          </div>
        )}
        <div className="relative z-10">
          {children}
          {withCallToAction && <CallToAction />}
        </div>
      </div>
    </div>
  );
}
