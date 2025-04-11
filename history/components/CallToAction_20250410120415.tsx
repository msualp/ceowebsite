import Link from 'next/link';

export const CallToAction = () => {
  return (
    <div className="mt-16 mb-12 border-t border-gray-200 dark:border-gray-800 pt-12">
      {/* Call to Action */}
      <p className="text-center mb-6">
        <Link href="/sociail" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Learn more about the vision behind Sociail →
        </Link>
      </p>

      {/* Connect CTA */}
      <div className="text-center mb-8">
        <Link 
          href="/contact" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Let&apos;s Connect
        </Link>
      </div>

      {/* Signature Block */}
      <div className="text-right italic text-xl text-gray-700 dark:text-gray-300">
        — Mustafa
      </div>
    </div>
  );
};
