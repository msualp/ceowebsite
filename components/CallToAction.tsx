import Link from 'next/link';
import Image from 'next/image';

export const CallToAction = () => {
  return (
    <div className="py-16 bg-gray-900 dark:bg-gray-900/50 mt-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Avatar and quote area */}
        <div className="mb-8 relative inline-block">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg mx-auto">
            <Image
              src="/images/Mustafa-Sualp-Sociail-BW.png"
              alt="Mustafa Sualp"
              width={64}
              height={64}
              className="object-cover w-full h-full grayscale"
              priority
            />
          </div>
          <div className="mt-4 text-gray-300 italic text-lg md:text-xl max-w-2xl mx-auto">
            "I believe the measure of technology's success isn't efficiency alone, but how it elevates human potential."
          </div>
          <div className="mt-2 text-right text-blue-400 font-light pr-4">— Mustafa</div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
          <Link 
            href="/sociail" 
            className="text-blue-400 hover:text-blue-300 transition-colors text-lg flex items-center gap-2"
          >
            Learn more about the vision behind Sociail 
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          {/* Early Access Button */}
          <div className="relative">
            <Link
              href="https://www.sociail.com"
              className="relative inline-flex items-center justify-center gap-3 rounded-md px-6 py-3 h-[52px] min-h-[52px] text-base font-semibold text-gray-900 border border-gray-300 bg-white hover:bg-gray-100 transition shadow-sm min-w-[270px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/sociail-logo-with-gray-stroke.svg"
                alt="Sociail Logo"
                width={32}
                height={32}
                className="h-6 w-auto opacity-90 pointer-events-none"
                style={{ objectFit: 'contain' }}
              />
              <span>Join Early Access</span>
            </Link>
            <span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              Limited Seats
            </span>
          </div>

          {/* Connect Button */}
          <Link
            href="https://calendly.com/msualp-main"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 h-[52px] min-h-[52px] text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm min-w-[200px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Let's Connect
          </Link>
        </div>
      </div>
    </div>
  );
};
