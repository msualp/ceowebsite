'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'black' | 'gradient' | 'none';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Section({
  children,
  className = '',
  id,
  background = 'white',
  spacing = 'md'
}: SectionProps) {
  // Background classes
  const bgClasses = {
    white: 'bg-white dark:bg-gray-900',
    light: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-800 dark:bg-gray-950 text-white',
    black: 'bg-black dark:bg-white text-white dark:text-black',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
    none: ''
  };
  
  // Spacing classes
  const spacingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24'
  };
  
  return (
    <section 
      id={id}
      className={`fade-in-scroll ${bgClasses[background]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
