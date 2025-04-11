'use client';

import { ReactNode } from 'react';

interface AchievementCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

export default function AchievementCard({
  icon,
  title,
  description,
  className = '',
  index = 0
}: AchievementCardProps) {
  return (
    <div
      className={`hover-lift mac-glass p-6 rounded-xl border shadow-md ${className}`}
    >
      <div className="icon-container mb-4 mx-auto md:mx-0">{icon}</div>
      <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
