'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  color,
  className = ''
}: FeatureCardProps) {
  return (
    <div
      className={`bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-700 fade-in-scroll ${className}`}
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
