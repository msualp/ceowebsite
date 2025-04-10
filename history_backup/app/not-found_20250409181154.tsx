import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';

export default function NotFound() {
  return (
    <PageContainer title="404 - Page Not Found">
      <div className="text-center">
        <p className="mt-4 mb-8">Sorry, we couldn&apos;t find what you were looking for.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </PageContainer>
  );
}
