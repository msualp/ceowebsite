'use client';

import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';
import Section from '@/components/Section';

const DocumentarySection = () => {
  return (
    <Section background="dark" spacing="md">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 fade-in-scroll">
          {/* Video Preview Section */}
          <div className="w-full lg:w-1/2 aspect-video relative rounded-xl overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-black">
              <Image
                src="/images/ai-startup-documentary.jpg"
                alt="Behind the scenes of the AI Startup Documentary project"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-white ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* "Coming Soon" badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Coming Soon</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-white">The AI Startup Documentary</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We're documenting every step of the Sociail journey—from ideation to execution—creating the most transparent startup documentary ever made with the help of AI.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">What We're Capturing:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">Every team meeting and key decision moment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">AI-assisted transcription and analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">Real stories of triumphs and challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">Collaborative editing with AI directors</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <span>Join the Waitlist</span>
                <HiArrowLongRight className="w-5 h-5" />
              </button>
              <a href="#learn-more" className="text-blue-400 hover:text-blue-300 transition-colors">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DocumentarySection;
