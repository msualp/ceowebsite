'use client';

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  highlight?: string;
  className?: string;
}

export default function TimelineItem({
  title,
  date,
  description,
  highlight,
  className = ''
}: TimelineItemProps) {
  return (
    <div className={`relative space-y-3 fade-in-scroll ${className}`}>
      <div className="absolute -left-8 h-4 w-4 rounded-full bg-blue-600 mt-1.5 shadow-md pulse"></div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{date}</p>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
      {highlight && (
        <p className="text-gray-600 dark:text-gray-400 italic text-sm border-l-2 border-blue-600/30 pl-3 mt-2">
          {highlight}
        </p>
      )}
    </div>
  );
}
