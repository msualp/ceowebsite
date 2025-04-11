'use client';

import { HiAcademicCap } from 'react-icons/hi2';

interface EducationCardProps {
  institution: string;
  degree: string;
  field: string;
  period: string;
  logo?: string;
  className?: string;
}

export default function EducationCard({
  institution,
  degree,
  field,
  period,
  logo,
  className = ''
}: EducationCardProps) {
  return (
    <div 
      className={`hover-lift mac-glass p-6 rounded-xl flex ${className}`}
    >
      <div className="mr-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/40">
          <HiAcademicCap className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{institution}</h3>
        <p className="text-blue-600 dark:text-blue-400">{degree}, {field}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{period}</p>
      </div>
    </div>
  );
}
