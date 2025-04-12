import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { HeroSection } from '@/components/HeroSection';
import { BlobShape } from '@/components/SvgShapes';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section with background image */}
      <HeroSection
        title="About Me"
        subtitle="Tech Entrepreneur, AI Enthusiast, Lifelong Learner"
        height="h-[40vh]"
      />
      
      <PageContainer title="">
      {/* Profile Section - Enhanced with larger font and better spacing */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <Image
          src="/images/profile.jpg"
          alt="Profile Photo"
          width={120}
          height={120}
          className="rounded-full mr-6 mb-4 md:mb-0 border-2 border-white/20 shadow-md"
        />
        <div>
          <h2 className="text-4xl font-bold">Mustafa Sualp</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
            CEO & Founder, Sociail
          </p>
        </div>
      </div>

      <p className="text-lg mb-6">
        I&apos;m Mustafa Sualp, a serial entrepreneur, technologist, and AI enthusiast with a passion for 
        building products that enhance human potential.
      </p>

      {/* Enhanced blockquote with better styling */}
      <blockquote className="border-l-4 border-blue-600 pl-6 py-2 italic my-8 text-lg bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
        &quot;Focus on solving real problems for users, and you&apos;ll build something that lasts.&quot;
      </blockquote>

      {/* My Story Section - Added better spacing and section styling with decorative blob */}
      <section className="mb-12 relative">
        {/* Decorative blob shape */}
        <div className="absolute -top-16 -right-16 text-blue-200 dark:text-blue-900 opacity-20 pointer-events-none">
          <BlobShape />
        </div>
        
        <h3 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 relative z-10">My Story</h3>
        
        <p className="mb-4">
          My journey in technology began at Drexel University, where I studied Commerce and Engineering. While still in 
          college, I started my first company, providing managed technology services to financial institutions. This early 
          experience taught me the fundamentals of building and scaling a business, and ignited my passion for 
          entrepreneurship.
        </p>
        
        <p className="mb-4">
          In 2012, I founded AEFIS, an assessment management platform for higher education. What started as a bootstrapped 
          startup grew into a market-leading EdTech company, culminating in a successful acquisition in 2021. Building AEFIS 
          taught me invaluable lessons about patience, resilience, and the power of solving real problems for users.
        </p>
        
        <p className="mb-4">
          Today, I&apos;m focused on my newest venture, Sociail—a platform that seamlessly integrates AI into daily workflows, 
          redefining how teams collaborate, make decisions, and create new solutions. I believe we&apos;re at the beginning of a 
          transformative era where AI will fundamentally change how we work and create value.
        </p>
      </section>

      {/* Professional Timeline - Enhanced with better visual styling and decorative blob */}
      <section className="mb-12 relative">
        {/* Decorative blob shape */}
        <div className="absolute -bottom-16 -left-16 text-indigo-200 dark:text-indigo-900 opacity-20 pointer-events-none rotate-45">
          <BlobShape />
        </div>
        
              <h4 className="text-xl font-semibold">CEO & Founder, AEFIS</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Led the company from inception to successful acquisition, growing it into a market-leading EdTech platform.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mr-4 flex-shrink-0 shadow-sm">
              2008-2012
            </div>
            <div>
              <h4 className="text-xl font-semibold">Founder, Tech Services Company</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Provided managed technology services to financial institutions while still in college.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach - Enhanced with better styling */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">My Approach</h3>
        
        <p className="mb-4">
          I believe in building technology that enhances human capabilities rather than replacing them. My approach to 
          product development centers on three core principles:
        </p>
        
        <ul className="list-none space-y-3 mb-4 ml-4">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">User-centered design that solves real problems</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">Ethical AI development with transparency and fairness</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">Building for long-term impact over short-term gains</span>
          </li>
        </ul>
      </section>

      {/* Enhanced CTA button - moved outside the PageContainer */}
    </PageContainer>
  );
}
