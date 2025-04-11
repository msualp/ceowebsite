'use client';

interface SkillBadgeProps {
  skill: string;
  className?: string;
}

export default function SkillBadge({
  skill,
  className = ''
}: SkillBadgeProps) {
  return (
    <div 
      className={`hover-lift mac-glass p-4 rounded-lg flex items-center ${className}`}
    >
      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 pulse"></div>
      <span className="text-gray-800 dark:text-gray-200 font-medium">{skill}</span>
    </div>
  );
}
