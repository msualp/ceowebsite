'use client';

import { ReactNode } from 'react';

// Heading component
interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}

export function Heading({ 
  children, 
  level, 
  className = '', 
  id 
}: HeadingProps) {
  const baseClasses = 'font-bold text-gray-900 dark:text-white';
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl mb-6',
    2: 'text-3xl md:text-4xl mb-5',
    3: 'text-2xl md:text-3xl mb-4',
    4: 'text-xl md:text-2xl mb-3',
    5: 'text-lg md:text-xl mb-2',
    6: 'text-base md:text-lg mb-2',
  };
  
  const combinedClasses = `${baseClasses} ${sizeClasses[level]} ${className}`;
  
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return <HeadingTag id={id} className={combinedClasses}>{children}</HeadingTag>;
}

// Text component
interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = 'default',
  className = '',
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-gray-900 dark:text-white',
    muted: 'text-gray-600 dark:text-gray-400',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
  };
  
  const combinedClasses = `${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`;
  
  return <p className={combinedClasses}>{children}</p>;
}

// Paragraph component with proper spacing
interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export function Paragraph({
  children,
  className = '',
}: ParagraphProps) {
  return (
    <p className={`text-gray-700 dark:text-gray-300 mb-4 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// Label component for form fields
interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export function Label({
  children,
  htmlFor,
  required = false,
  className = '',
}: LabelProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// Caption component for small text
interface CaptionProps {
  children: ReactNode;
  className?: string;
}

export function Caption({
  children,
  className = '',
}: CaptionProps) {
  return (
    <p className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
}
