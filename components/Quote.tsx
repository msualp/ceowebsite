'use client';

interface QuoteProps {
  text?: string;
  quote?: string; // Alternative to text
  author?: string;
  role?: string;
  className?: string;
}

export default function Quote({
  text,
  quote,
  author,
  role,
  className = ''
}: QuoteProps) {
  // Use quote prop if provided, otherwise use text prop
  const quoteText = quote || text || '';
  
  return (
    <div className={`bg-blue-50 dark:bg-blue-900/30 p-8 rounded-lg border-l-4 border-blue-600 text-gray-800 dark:text-gray-100 italic fade-in-scroll ${className}`}>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic max-w-3xl mx-auto">
        "{quoteText}"
      </p>
      {author && (
        <p className="mt-6 text-blue-600 font-semibold text-right">
          — {author} {role && <span className="font-normal text-gray-600 dark:text-gray-400">{role}</span>}
        </p>
      )}
    </div>
  );
}
