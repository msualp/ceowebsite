'use client';

interface AwardCardProps {
  title: string;
  description: string;
  year: string;
  issuer: string;
  className?: string;
}

export default function AwardCard({
  title,
  description,
  year,
  issuer,
  className = ''
}: AwardCardProps) {
  return (
    <div 
      className={`hover-lift mac-glass p-6 rounded-xl ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          🏆 {title}
        </h3>
        <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full text-sm font-medium mt-2 md:mt-0">
          {year}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Issued by {issuer}
      </p>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
