'use client';

import { ReactNode } from 'react';

type GlassVariant = 'default' | 'blue' | 'purple' | 'green' | 'amber';
type GlassIntensity = 'light' | 'medium' | 'heavy';

interface GlassProps {
  children: ReactNode;
  variant?: GlassVariant;
  intensity?: GlassIntensity;
  className?: string;
  hover?: boolean;
}

export function Glass({
  children,
  variant = 'default',
  intensity = 'medium',
  className = '',
  hover = false,
}: GlassProps) {
  // Map variants to color classes
  const variantClasses = {
    default: 'bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-gray-800/20',
    blue: 'bg-blue-50/70 dark:bg-blue-900/30 border-blue-200/30 dark:border-blue-800/20',
    purple: 'bg-purple-50/70 dark:bg-purple-900/30 border-purple-200/30 dark:border-purple-800/20',
    green: 'bg-green-50/70 dark:bg-green-900/30 border-green-200/30 dark:border-green-800/20',
    amber: 'bg-amber-50/70 dark:bg-amber-900/30 border-amber-200/30 dark:border-amber-800/20',
  };
  
  // Map intensity to blur and opacity
  const intensityClasses = {
    light: 'backdrop-blur-sm bg-opacity-60 dark:bg-opacity-40',
    medium: 'backdrop-blur-md bg-opacity-70 dark:bg-opacity-50',
    heavy: 'backdrop-blur-lg bg-opacity-80 dark:bg-opacity-60',
  };
  
  // Hover effect classes
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div className={`rounded-xl border shadow-sm ${variantClasses[variant]} ${intensityClasses[intensity]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

export default Glass;
