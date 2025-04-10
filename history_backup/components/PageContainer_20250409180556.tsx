'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      {title && <h1 className="text-4xl font-bold mb-6">{title}</h1>}
      
      <div className="glass p-8 rounded-xl shadow-xl mb-8">
        {children}
      </div>
    </div>
  );
}
