'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HiLightBulb, 
  HiAcademicCap, 
  HiUserGroup, 
  HiArrowLongRight,
  HiCpuChip,
  HiPuzzlePiece
} from 'react-icons/hi2';
import { PageContainer } from '@/components/PageContainer';
import { BlobShape } from '@/components/SvgShapes';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import SectionHeading from '@/components/SectionHeading';
import HeroImage from '@/components/HeroImage';
import Button from '@/components/Button';
import { CTAGroup } from '@/components/cta/CTAGroup';
import Quote from '@/components/Quote';
import AchievementCard from '@/components/AchievementCard';
import TimelineItem from '@/components/TimelineItem';
import ValueCard from '@/components/ValueCard';

export default function AboutPage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);
  return (
    <>
      {/* Hero Section with optimized contrast */}
      <section className="bg-black py-20 px-4 text-center relative overflow-hidden fade-in-scroll">
        {/* Semi-transparent overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        
        {/* Animated background watermarks with reduced opacity */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* First line - left to right */}
          <div className="animate-marquee whitespace-nowrap text-[8vw] font-extrabold text-gray-700/10 absolute top-0" style={{ animationDuration: '80s' }}>
            Productivity · Flow · LLMs · Sociail · Multi-Agent · Reinvention · Vision · Learning · Alignment · Assessment ·&nbsp;
            Productivity · Flow · LLMs · Sociail · Multi-Agent · Reinvention · Vision · Learning · Alignment · Assessment ·
          </div>
          
          {/* Second line - right to left */}
          <div className="animate-marquee-reverse whitespace-nowrap text-[8vw] font-extrabold text-gray-700/10 absolute top-[8vw]" style={{ animationDuration: '70s' }}>
            Innovation · AI · Collaboration · Leadership · Growth · Strategy · Execution · Creativity · Purpose · Impact ·&nbsp;
            Innovation · AI · Collaboration · Leadership · Growth · Strategy · Execution · Creativity · Purpose · Impact ·
          </div>
          
          {/* Third line - left to right */}
          <div className="animate-marquee whitespace-nowrap text-[8vw] font-extrabold text-gray-700/10 absolute top-[16vw]" style={{ animationDuration: '90s' }}>
            Technology · Future · Potential · Transformation · Insight · Knowledge · Wisdom · Experience · Journey · Vision ·&nbsp;
            Technology · Future · Potential · Transformation · Insight · Knowledge · Wisdom · Experience · Journey · Vision ·
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white relative z-10 mb-2">
          Mustafa Sualp
        </h1>
        <p className="text-lg md:text-xl text-gray-300 relative z-10 max-w-2xl mx-auto">
          Serial Entrepreneur, AI Collaboration Visionary, Servant Leader
        </p>
      </section>

      <PageContainer title="">
        {/* Profile Section - Enhanced with larger font and better spacing */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8 mt-8 gap-8 fade-in-scroll">
          <div className="md:w-1/2">
            <div className="img-with-caption relative">
              <Image
                src="/images/mustafa-sualp-working.png"
                alt="Mustafa Sualp working on a laptop in professional attire"
                width={360}
                height={240}
                className="rounded-xl mr-6 mb-4 md:mb-0 border border-white/20 shadow-md"
                priority
              />
              <div className="caption-reveal">
                Founder & CEO, Sociail
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold">Mustafa Sualp</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
              Founder & CEO, Sociail
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="https://www.linkedin.com/in/sualp/" className="flex items-center hover:text-blue-600 transition-colors mr-4" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-1 icon-hover" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </Link>
              <Link href="https://www.sociail.com" className="flex items-center hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-1 icon-hover" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                sociail.com
              </Link>
            </div>
          </div>
        </div>

        <p className="text-lg mb-6 fade-in-scroll">
          I'm a serial entrepreneur, technologist, and AI enthusiast with a passion for 
          building products that enhance human potential. After successfully founding, scaling, and exiting AEFIS—an EdTech 
          platform that transformed higher education assessment—I'm now focused on revolutionizing human-AI collaboration 
          through Sociail.
        </p>

        {/* Enhanced blockquote with better styling */}
        <Quote 
          text="My hope is that, with time and focus, we might elevate our lives through AI, channeling our energies toward a human existence that feels not only vast but deeply interconnected, with each life enriched and empowered by this collective creation."
          author="Mustafa Sualp"
        />
        
        {/* NEW: Sociail Vision Section */}
        <section className="mb-20 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 text-blue-200/40 dark:text-blue-800/30 pointer-events-none rotate-12 z-0">
            <BlobShape className="w-[300px] h-[300px]" />
          </div>
          
          <h3 className="text-center text-sm font-bold text-blue-600 uppercase mb-2 relative z-10">Current Focus</h3>
          <h2 className="text-3xl font-extrabold text-center mb-6 relative z-10">Sociail: The Future of Human-AI Collaboration</h2>
          
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">What We're Building</h4>
              <p className="mb-4">
                Sociail is a real-time collaborative AI chat platform at the intersection of AI assistants, 
                productivity software, and communication tools. We're creating a workspace where humans and AIs collaborate 
                seamlessly, shaping the future of productivity.
              </p>
              <p>
                Built on a foundation of Matrix Synapse and Element IO chat, our platform maintains contextual awareness 
                across conversations, preserving knowledge and enhancing team collaboration in ways current tools simply cannot.
              </p>
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Why I Care</h4>
              <p className="mb-4">
                With the vast tools and understanding we've amassed, one would think it a simple matter to transcend the 
                boundaries of space and time in our collaborations, to harness AI as a force for enhancing human connection, 
                creation, and comprehension. And yet, it remains an imperfect endeavor.
              </p>
              <p>
                This is precisely why I dedicate my days to cultivating a vision for Sociail—a vision that aspires to uplift 
                humanity, to forge spaces where minds meet, collaborate, and dream together.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center relative z-10">
            <Link href="/sociail" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              Learn More About Sociail
              <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Notable Achievements Section - Enhanced with more specific metrics */}
        <section className="my-20">
          <h3 className="text-center text-sm font-bold text-blue-600 uppercase mb-2">Track Record</h3>
          <h2 className="text-3xl font-extrabold text-center mb-10">Notable Achievements</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, 
                title: 'Successfully Led Global Remote Transformation', 
                description: 'Built effective remote work structures for a distributed team across 3 continents, achieving 30% productivity improvement during the pandemic transition.' 
              },
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, 
                title: 'Presided Over 72% Growth During COVID', 
                description: 'Led AEFIS to exceptional growth despite global challenges, expanding customer base from 32 to 55 higher education institutions in 18 months.' 
              },
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, 
                title: 'Generated 4.8x Return for Investors', 
                description: 'Delivered substantial ROI for seed investors through strategic growth and a successful private equity exit in 2021.' 
              },
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, 
                title: 'Built Disruptive EdTech Solution', 
                description: 'Created and scaled AEFIS against entrenched competitors like Blackboard and Canvas, transforming assessment practices at leading universities.' 
              },
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>, 
                title: 'Winner, Philadelphia 100® Awards', 
                description: 'Recognized in both 2016 and 2017 among the region\'s fastest-growing companies by the prestigious Philadelphia 100.' 
              },
              { 
                icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>, 
                title: 'Scaled Team from 3 to 28', 
                description: 'Built a diverse, high-performing team across engineering, customer success, and sales, with 92% retention during rapid growth periods.' 
              }
            ].map(({ icon, title, description }, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="mb-4 group-hover:scale-110 transform transition-transform duration-300">{icon}</div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Father & Son Image Section - With special consideration */}
        <div className="group relative mt-12 mb-12 max-w-3xl mx-auto px-4">
          <Image
            src="/images/future-innovator-in-trainign.png"
            alt="Mustafa Sualp spending quality time with his young son Luke, sharing a moment of connection"
            width={800}
            height={450}
            className="rounded-xl shadow-md w-[80%] mx-auto object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] bg-black/60 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
            Cherished moments with my son Luke — raising the next generation of curious minds
          </div>
        </div>

        {/* My Story Section - Added better spacing and section styling with decorative blob */}
        <section className="mb-12 relative mt-12">
          {/* Decorative blob shape */}
          <div className="absolute -top-16 -right-16 text-blue-200 dark:text-blue-900 opacity-20 pointer-events-none">
            <BlobShape />
          </div>
          
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            My Journey
          </h3>
          
          <p className="mb-4">
            My entrepreneurial path began at Drexel University, where I studied Commerce and Engineering. While still in 
            college, I launched my first company providing managed technology services to financial institutions, planting 
            the seeds for my future ventures.
          </p>
          
          <p className="mb-4">
            In 2012, I founded AEFIS, an assessment management platform for higher education. What started as a bootstrapped 
            startup with just three team members grew into a market-leading EdTech company with clients across the United States. 
            For nearly a decade, we pioneered student-centered assessment approaches, eventually culminating in a successful 
            acquisition in 2021.
          </p>
          
          <p className="mb-4">
            The AEFIS journey taught me invaluable lessons about patience, resilience, and the power of mission-driven 
            entrepreneurship. Most importantly, I discovered that creating social value directly translates to economic 
            value creation—a principle that continues to guide my work today.
          </p>
          
          <p className="mb-4">
            Now, with Sociail, I'm applying these lessons to a new frontier: redefining how humans and AI collaborate. 
            We're building a real-time collaborative AI chat platform that seamlessly integrates artificial intelligence 
            into everyday workflows, making AI a natural extension of team capabilities rather than just another tool.
          </p>
          
          <div className="my-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Want to Connect?</h2>
            <p className="mb-6">
              I'm always open to discussing AI, entrepreneurship, or potential collaborations.
            </p>
            <CTAGroup 
              variant="inline" 
              primaryCTA="calendly" 
              secondaryCTA="linkedin" 
            />
          </div>
        </section>

        {/* Philosophy & Values - Enhanced with better styling */}
        <section className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            Philosophy & Values
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Core Principles</h4>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Technology should enhance human capabilities, not replace them</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Great products solve real problems, not imagined ones</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Ethical AI development requires transparency, fairness, and human oversight</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Leadership Approach</h4>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Servant leadership that empowers teams to achieve extraordinary results</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Building for long-term impact over short-term gains</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                  <span className="font-medium">Balancing visionary thinking with disciplined execution</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Personal Elements Section */}
        <section className="mb-12 mt-16">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Beyond Business
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Things I Value</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Family time with my wife Caitlin and son Luke</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Deep work and achieving flow states</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Continuous learning and knowledge sharing</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Fun Facts</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Bootstrapped AEFIS for 8 years before its acquisition</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Classic car enthusiast alongside my passion for AI</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Bilingual in English and Turkish</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Causes I Support</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Education equity and access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Ethical AI development and governance</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Animal welfare and rescue organizations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <div className="group relative mt-20 mb-12 max-w-4xl mx-auto">
          <Image
            src="/images/mustafa-desk-view.png"
            alt="Mustafa Sualp focused on work at his desk with multiple monitors, showcasing his dedication to building Sociail"
            width={800}
            height={450}
          className="rounded-xl shadow-md w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="block sm:hidden">
              Where vision meets execution.
            </span>
            <span className="hidden sm:block md:hidden">
              Where vision meets execution. Building the future of AI isn't just about ideas.
            </span>
            <span className="hidden md:block lg:hidden">
              Where vision meets execution. Building the future of AI isn't just about ideas — it's about putting in the hours at the command line.
            </span>
            <span className="hidden lg:block">
              Where vision meets execution. Building the future of AI isn't just about ideas — it's about putting in the hours at the command line... with a side of Nutella for brain fuel.
            </span>
          </div>
        </div>
        
        {/* Latest Insights - New Section to Drive to Blog */}
        <section className="mb-20">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Latest Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "The Third Wave of Collaboration: Why AI + Human Teams Will Redefine Productivity",
                excerpt: "When we look at the evolution of human collaboration, we can clearly identify distinct waves that have transformed how we work together...",
                date: "April 8, 2025",
                url: "/blog/third-wave-collaboration"
              },
              {
                title: "From EdTech to AI: My Journey Across Innovation Frontiers",
                excerpt: "Ten years ago, I stood at the beginning of a journey that would transform how higher education approached assessment...",
                date: "March 15, 2025",
                url: "/blog/edtech-to-ai"
              }
            ].map((post, index) => (
              <Link href={post.url} key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">{post.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  Read More
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium rounded-lg transition-colors">
              View All Insights
              <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
        
    </PageContainer>
</>
);
}
