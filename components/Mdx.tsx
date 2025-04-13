'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

// Enhanced MDX component with proper Markdown rendering
export function Mdx({ content, className = '' }: { content: string; className?: string }) {
  return (
    <div className={`prose dark:prose-invert max-w-none lg:prose-lg ${className} 
      prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-a:text-blue-600 prose-a:hover:underline
      prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-gray-100 prose-pre:dark:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-img:rounded-lg prose-img:shadow-md
      prose-strong:font-bold prose-em:italic
      prose-ul:list-disc prose-ol:list-decimal
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
    `}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
