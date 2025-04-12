'use client';

import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';

const WorkingOnSection = () => {
  return (
    <Section background="light" spacing="md">
      <SectionTitle 
        title="What I'm Working On" 
        subtitle="Current focus areas and initiatives"
      />
      
      {/* Primary Project - Sociail */}
      <div className="mac-glass p-8 rounded-xl shadow-xl mb-8 stagger-fade-in">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8">
          <div className="w-full md:w-2/5 lg:w-1/2">
            <Image
              src="/images/social-active-collaboration-screen-shot.svg"
              alt="Sociail Platform Interface Preview"
              width={800}
              height={600}
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full md:w-3/5 lg:w-1/2">
            <h3 className="text-2xl font-bold mb-3">Sociail Platform</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My primary focus is building Sociail—a next-generation collaborative AI platform that seamlessly integrates into daily workflows, helping teams make better decisions and create innovative solutions together.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded text-sm font-medium">AI</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2.5 py-0.5 rounded text-sm font-medium">Collaboration</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2.5 py-0.5 rounded text-sm font-medium">SaaS</span>
            </div>
            <div className="flex items-center">
              <Button 
                href="/sociail" 
                variant="primary"
                size="md"
                icon={<HiArrowLongRight />}
              >
                Learn more about Sociail
              </Button>
            </div>
          </div>
        </div>
        
        {/* Secondary Projects */}
        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/devaiccelerate-website.png"
                alt="DevAIccelerate Website Preview"
                width={600}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <ProjectCard
              title="DevAIccelerate"
              description="An innovation hub at the intersection of AI and developer experience. Tools, ideas, and experiments to help developers move faster with AI-assisted workflows."
              tags={[
                { label: 'DevTools', color: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100' },
                { label: 'AI Productivity', color: 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100' }
              ]}
              link={{
                href: 'https://www.devaiccelerate.com',
                label: 'Explore'
              }}
            />
          </div>
          
          <ProjectCard
            title="AI Ethics & Collaboration Network"
            description="Leading discussions on ethical AI implementation and building a global network of researchers and practitioners exploring human-AI collaboration models."
            tags={[
              { label: 'Thought Leadership', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100' },
              { label: 'Ethics', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100' }
            ]}
            link={{
              href: '/collaborative-ai',
              label: 'Join the conversation'
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default WorkingOnSection;
