'use client';

import HeroImage from '@/components/HeroImage';
import { CTAGroup } from '@/components/cta/CTAGroup';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black fade-in-scroll">
      <div className="absolute inset-0 mac-glass z-0" />

      {/* Responsive container that stacks on mobile, side-by-side on larger screens */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Image container - Mobile first approach */}
        <div className="w-full md:w-2/5 h-[50vh] md:h-screen relative overflow-hidden">
          {/* Image with absolute positioning - removed z-[-1] to prevent gaps */}
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <HeroImage
              src="/images/Mustafa-Sualp-Sociail-BW.png"
              alt="Mustafa Sualp, Founder and CEO of Sociail, in professional black and white portrait"
              priority={true}
              objectPosition="center 33%"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Text container - Full width on mobile, 60% on desktop */}
        <div className="w-full md:w-3/5 flex items-center px-6 py-16 md:py-0 md:px-10 lg:px-20">
          <div className="text-left max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-gray-900 dark:text-white">
              Rewiring Human Collaboration for the Age of AI
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 md:mb-8">
              Built one company from code to exit. Now building the next — to reinvent how humans and AI collaborate, create, and thrive together.
            </p>
            <CTAGroup 
              variant="hero" 
              primaryCTA="earlyAccess" 
              secondaryCTA="calendly" 
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
