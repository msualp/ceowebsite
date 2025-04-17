'use client';

import { ReactNode } from 'react';

export type CardVariant = 'default' | 'glass' | 'outlined' | 'elevated';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  // Base classes for all cards
  const baseClasses = 'rounded-xl overflow-hidden';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700',
    glass: 'backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20',
    outlined: 'border-2 border-gray-200 dark:border-gray-700 bg-transparent',
    elevated: 'bg-white dark:bg-gray-800 shadow-md',
  };
  
  // Size classes (padding)
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  // Hover effect classes
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
    : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
