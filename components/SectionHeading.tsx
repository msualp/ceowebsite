'use client';

import { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  title,
  icon,
  className = ''
}: SectionHeadingProps) {
  return (
    <h3 className={`text-2xl font-semibold mb-6 flex items-center gap-2 fade-in-scroll ${className}`}>
      {icon && (
        <div className="icon-container w-8 h-8 rounded-md flex items-center justify-center">
          {icon}
        </div>
      )}
      {title}
    </h3>
  );
}
