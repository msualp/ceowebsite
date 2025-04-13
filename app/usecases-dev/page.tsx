'use client';

import React from 'react';
import UseCasesDev from '@/components/home/UseCasesDev';
import Head from 'next/head';

export default function UseCasesDevPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>UseCases Dev - Internal Review</title>
      </Head>
      
      <main className="pt-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">UseCases Dev - Internal Review</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Internal review of the improved UseCases component with enhanced user experience and functionality.
          </p>
        </div>
        
        <UseCasesDev />
        
        <div className="max-w-6xl mx-auto px-4 mt-16 mb-12">
          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Implementation Notes</h3>
            <p className="mb-4">
              This is a development version of the UseCases component with the following improvements:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-6">
              <li>Replaced three lines of flying objects with a single track of category boxes</li>
              <li>Improved discoverability with category-based organization</li>
              <li>Enhanced mobile experience with vertical scrolling</li>
              <li>Better accessibility with clearer navigation</li>
              <li>Simplified user interface for easier selection</li>
            </ul>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Note:</strong> This page is for internal review only and should not be linked from public-facing pages.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
