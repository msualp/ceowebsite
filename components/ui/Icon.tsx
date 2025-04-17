'use client';

import { ReactNode } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'muted';

interface IconProps {
  icon: ReactNode;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}

export function Icon({
  icon,
  size = 'md',
  color = 'default',
  className = '',
}: IconProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };
  
  const colorClasses = {
    default: 'text-gray-900 dark:text-white',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    muted: 'text-gray-500 dark:text-gray-400',
  };
  
  const combinedClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  // Clone the icon element with the new classes
  return (
    <span className={combinedClasses}>
      {icon}
    </span>
  );
}

export default Icon;
