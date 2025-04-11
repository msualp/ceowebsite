'use client';

import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = '',
  children
}: SectionTitleProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-3xl font-bold mb-2 fade-in-scroll">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto fade-in-scroll">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
