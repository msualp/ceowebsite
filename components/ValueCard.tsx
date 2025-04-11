'use client';

import { ReactNode } from 'react';

interface ValueItem {
  text: string;
}

interface ValueCardProps {
  title: string;
  items?: ValueItem[];
  description?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  className?: string;
}

export default function ValueCard({
  title,
  items,
  description,
  icon,
  iconBgColor,
  className = ''
}: ValueCardProps) {
  return (
    <div className={`hover-lift mac-glass p-6 rounded-xl ${className}`}>
      {icon && (
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${iconBgColor}`}>
          {icon}
        </div>
      )}
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      )}
      
      {items && items.length > 0 && (
        <ul className="space-y-2 mt-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
