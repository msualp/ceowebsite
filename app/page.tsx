'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import HeroImage from '@/components/HeroImage';
import ProjectCard from '@/components/ProjectCard';
import InsightCard from '@/components/InsightCard';
import Button from '@/components/Button';
import { CTAGroup } from '@/components/cta/CTAGroup';
import { FooterCTA } from '@/components/cta/FooterCTA';

export default function HomePage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black overflow-hidden fade-in-scroll">
        <div className="absolute inset-0 mac-glass z-0" />

        {/* Responsive container that stacks on mobile, side-by-side on larger screens */}
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
          {/* Image container - Mobile first approach */}
          <div className="w-full md:w-2/5 h-[50vh] md:h-screen relative">
            {/* Image with absolute positioning */}
            <div className="absolute inset-0">
              <HeroImage
                src="/images/Mustafa-Sualp-Sociail-BW.png"
                alt="Mustafa Sualp, Founder and CEO of Sociail, in professional black and white portrait"
                priority={true}
                objectPosition="center 33%"
                caption="Founder & CEO, Sociail"
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

      {/* Rotating Use Case Subheadline */}
      <section className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto text-center text-base md:text-lg text-gray-800 dark:text-gray-200 font-medium h-8 overflow-hidden relative">
          <div className="animate-slideUp absolute w-full flex flex-col items-center gap-1">
            <span>Helping students co-write their future with AI.</span> {/* B2C */}
            <span>Enabling solopreneurs to scale expertise on demand.</span> {/* B2C */}
            <span>Enhancing creators' workflows with collaborative agents.</span> {/* B2C */}
            <span>Accelerating team decisions with intelligent copilots.</span> {/* B2B */}
            <span>Turning org-wide knowledge into instant insight.</span> {/* B2B */}
            <span>Aligning product, sales, and support with shared AI memory.</span> {/* B2B */}
            <span>Helping educators scale meaningful feedback at scale.</span> {/* B2E */}
            <span>Empowering advisors with context-rich student support.</span> {/* B2E */}
            <span>Enabling executives to strategize with real-time intelligence.</span> {/* B2E */}
          </div>
        </div>
      </section>

      {/* Mission Capsule */}
      <section className="bg-black dark:bg-white py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-mono text-green-400 dark:text-green-700 text-sm">
            &gt;&gt;&gt; mission.sh
          </div>
          <p className="mt-2 text-xl font-semibold text-white dark:text-black">
            Rewire how humans and AIs collaborate — with purpose, clarity, and creativity.
          </p>
        </div>
      </section>
      
      {/* What I'm Working On Section */}
      <Section background="light" spacing="md">
        <SectionTitle 
          title="What I'm Working On" 
          subtitle="Current projects and initiatives I'm focused on"
        />
        
        <div className="mac-glass p-8 rounded-xl shadow-xl mb-8">
          <div className="grid md:grid-cols-2 gap-8 stagger-fade-in">
            <ProjectCard
              title="Sociail Platform"
              description="Building a next-generation AI collaboration platform that seamlessly integrates into daily workflows, helping teams make better decisions and create innovative solutions."
              tags={[
                { label: 'AI', color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' },
                { label: 'Collaboration', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' },
                { label: 'SaaS', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100' }
              ]}
              link={{
                href: '/sociail',
                label: 'Learn more'
              }}
            />
            
            <ProjectCard
              title="AI Ethics Initiative"
              description="Leading a cross-industry initiative to establish ethical guidelines for AI development and deployment, focusing on transparency, fairness, and human-centered design principles."
              tags={[
                { label: 'Ethics', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100' },
                { label: 'Policy', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' },
                { label: 'Research', color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100' }
              ]}
              link={{
                href: '#',
                label: 'Coming soon'
              }}
            />
          </div>
        </div>
      </Section>
      
      {/* Latest Insights Section */}
      <Section background="white" spacing="md">
        <SectionTitle 
          title="Latest Insights" 
          subtitle="Thoughts and perspectives on AI, leadership, and innovation"
        />
        
        <div className="mac-glass p-8 rounded-xl shadow-xl mb-8">
          <div className="grid md:grid-cols-2 gap-8 stagger-fade-in">
            <InsightCard
              title="Precision and Alignment: Great Lesson from Mentor"
              date="April 9, 2025"
              excerpt="How a mentor's focus on precise language transformed my approach to leadership and team alignment."
              slug="precision-and-alignment"
            />
            
            <InsightCard
              title="Lessons from Bootstrapping AEFIS"
              date="April 9, 2025"
              excerpt="My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit."
              slug="lessons-from-bootstrapping"
            />
          </div>
        </div>
        
        <div className="text-center fade-in-scroll">
          <Button 
            href="/insights" 
            variant="outline"
            icon={<HiArrowLongRight />}
          >
            View All Insights
          </Button>
        </div>
      </Section>

      {/* Team Tribute Section */}
      <Section background="light" spacing="md">
        <div className="section-glass">
          <SectionTitle title="My Team is My Superpower" />
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center v-rhythm-md">
            Pictured here with the AEFIS team just days before the COVID-19 lockdown. 
            A difficult, transformative time — but also one of our most inspiring chapters. 
            I am forever grateful to those who helped shape that journey.
          </p>
          <div className="img-with-caption relative rounded-xl overflow-hidden shadow-lg border border-white/20">
            <Image
              src="/images/Mustafa-Sualp-with-AEFIS-Team.png"
              alt="AEFIS team gathered for a group photo in March 2020, just before the COVID-19 pandemic"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="caption-reveal">
              AEFIS team, March 2020 — just days before the world changed.
            </div>
          </div>
        </div>
      </Section>
      
      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
}
