'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Button } from './Button';
import { CTAGroup } from './CTAGroup';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/lib/animation-utils';

export const FooterCallToAction = () => {
  // State for scroll animation
  const [isVisible, setIsVisible] = useState(false);
  const { initScrollAnimations } = useAnimations();

  // Observe when component is in viewport and animate accordingly
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('footer-cta');
    if (element) {
      observer.observe(element);
    }

    // Initialize other animations
    const cleanup = initScrollAnimations();

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      // Only call cleanup if it's a function
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [initScrollAnimations]);

  return (
    <div 
      id="footer-cta" 
      className={cn(
        "relative py-16 mt-20 bg-gray-900 dark:bg-gray-900 transition-opacity duration-700",
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      aria-labelledby="footer-cta-heading"
    >      
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Avatar and quote area */}
        <div className="mb-10">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mx-auto mb-6">
            <Image
              src="/images/Mustafa-Sualp-Sociail-BW.png"
              alt="Mustafa Sualp"
              width={64}
              height={64}
              className="object-cover w-full h-full img-grayscale"
              sizes="64px"
              priority
            />
          </div>
          
          <blockquote className="text-gray-300 italic text-lg md:text-xl max-w-2xl mx-auto">
            "I believe the measure of technology's success isn't efficiency alone, but how it elevates human potential."
          </blockquote>
          <cite className="mt-4 text-blue-400 font-light block">— Mustafa</cite>
        </div>

        {/* Learn more link */}
        <div className="mb-10">
          <Link 
            href="/sociail" 
            className="text-blue-400 hover:text-blue-300 transition-colors text-lg flex items-center justify-center gap-2 group focus-visible-ring"
          >
            Learn more about the vision behind Sociail 
            <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CTA Buttons */}
        <CTAGroup 
          variant="footer"
          primaryCTA="earlyAccess"
          secondaryCTA="calendly"
          className="justify-center"
        />
      </div>
    </div>
  );
};

export default FooterCallToAction;
