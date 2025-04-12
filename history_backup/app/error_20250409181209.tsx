'use client';

import { useEffect } from 'react';
import PageContainer from '@/components/PageContainer';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer title="Something went wrong!">
      <div className="text-center">
        <p className="mt-4 mb-8">We apologize for the inconvenience. Please try again.</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </PageContainer>
  );
}
