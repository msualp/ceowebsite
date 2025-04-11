'use client';

interface QuoteProps {
  text: string;
  author?: string;
  className?: string;
}

export default function Quote({
  text,
  author,
  className = ''
}: QuoteProps) {
  return (
    <div className={`bg-blue-50 dark:bg-blue-900/30 p-8 rounded-lg border-l-4 border-blue-600 text-gray-800 dark:text-gray-100 italic mb-16 fade-in-scroll ${className}`}>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic max-w-3xl mx-auto">
        "{text}"
      </p>
      {author && (
        <p className="mt-6 text-blue-600 font-semibold text-right">— {author}</p>
      )}
    </div>
  );
}
