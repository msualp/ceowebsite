'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { BlobShape } from '@/components/SvgShapes';
import {
  HiLightBulb,
  HiAcademicCap,
  HiTrophy,
  HiChevronRight,
  HiArrowLongRight,
} from 'react-icons/hi2';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import { CTAGroup } from '@/components/cta/CTAGroup';
import TimelineEntry from '@/components/TimelineEntry';
import EducationCard from '@/components/EducationCard';
import AwardCard from '@/components/AwardCard';
import SkillBadge from '@/components/SkillBadge';

export default function JourneyPage() {
  const timelineEntries = [
    {
      company: "Sociail, Inc.",
      role: "Founder & CEO",
      period: "March 2023 - Present",
      description: [
        "Leading the development of a real-time collaborative AI platform that redefines how modern teams create, decide, and deliver.",
        "Built a robust MVP with over $600K in investment, focusing on seamless AI integration into natural team workflows.",
        "Preparing for beta launch to 1,000-10,000 users in Q2 2025 to validate product-market fit and refine our offering.",
        "Targeting a $300B total addressable market across productivity, collaboration, and AI sectors."
      ],
      highlight: "Revolutionary AI Collaboration Platform",
      logo: "/images/sociail-logo-with-gray-stroke.svg"
    },
    {
      company: "HelioCampus",
      role: "VP of Assessment Solutions",
      period: "September 2021 - June 2022",
      description: [
        "Orchestrated the seamless merger between AEFIS and HelioCampus following acquisition.",
        "Led cross-functional teams through post-acquisition integration while maintaining service excellence for existing clients.",
        "Ensured knowledge transfer and cultural alignment between organizations to preserve the value proposition that made AEFIS successful."
      ],
      highlight: "Successful Post-Acquisition Integration"
    },
    {
      company: "AEFIS",
      role: "Founder & CEO",
      period: "October 2012 - June 2022",
      description: [
        "Founded and scaled AEFIS from bootstrap startup to leading EdTech company offering SaaS-based Assessment Management Solution to Higher Education.",
        "Secured seed funding in 2018 that enabled 70%+ growth during COVID despite challenging market conditions.",
        "Led the company to successful acquisition by HelioCampus in September 2021, delivering strong returns to investors.",
        "Transformed how institutions approach assessment, shifting from compliance to learning-centered approaches that improve student outcomes."
      ],
      highlight: "Bootstrap to Successful Exit"
    },
    {
      company: "UNTRA Corporation",
      role: "Founder & CEO",
      period: "April 1999 - December 2017",
      description: [
        "Founded and led a technology services company providing managed services, enterprise software development, and cloud solutions to financial institutions.",
        "Grew the company to be recognized twice on the Philadelphia 100® list of fastest-growing companies (2009, 2017).",
        "Bootstrapped and incubated early development of AEFIS, providing critical resources during initial growth phases.",
        "Developed expertise in enterprise software, cloud infrastructure, and financial technology that later informed future ventures."
      ],
      highlight: "Bootstrapped Tech Services Growth"
    },
    {
      company: "Drexel University",
      role: "Information Systems Director, School of Biomedical Engineering",
      period: "1996 - 2009",
      description: [
        "Designed and developed the BIOMED Continuous Quality Improvement (CQI) system for ABET Accreditation, which later became the foundation for AEFIS.",
        "Commercialized concepts through technology transfer of IP to launch assessment software that would transform how universities approach student success.",
        "Led the implementation of web communications and information exchange infrastructure across university systems.",
        "Balanced professional roles with academic studies in Commerce and Engineering, applying classroom learning to real-world challenges."
      ],
      highlight: "Technology Innovation in Higher Ed"
    }
  ];
  // Toggle state for timeline highlights
  const [showHighlights, setShowHighlights] = useState(() => timelineEntries.map(() => false));
  const toggleHighlight = (index: number) => {
    setShowHighlights((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  const education = [
    {
      institution: "Massachusetts Institute of Technology",
      degree: "Professional Education",
      field: "Artificial Intelligence & Machine Learning",
      period: "January 2023 - May 2023",
      logo: "/images/mit-logo.svg"
    },
    {
      institution: "Drexel University's LeBow College of Business",
      degree: "B.S.",
      field: "Commerce and Engineering",
      period: "August 1994 - June 1999",
      logo: "/images/drexel-logo.svg"
    }
  ];

  const awards = [
    {
      title: "Untra - Winner of the 2017 Philadelphia 100® Awards",
      description: "Recognition for being one of the fastest growing companies in the Philadelphia region, demonstrating sustained business excellence over multiple years.",
      year: "2017",
      issuer: "The Wharton Small Business Development Center and The Entrepreneurs' Forum of Greater Philadelphia"
    },
    {
      title: "AEFIS - 2016 Philadelphia 100® Award Recipient",
      description: "Acknowledgment of AEFIS's rapid growth and innovation in the EdTech sector, validating our approach to assessment management in Higher Education.",
      year: "2016",
      issuer: "The Wharton Small Business Development Center and The Entrepreneurs' Forum of Greater Philadelphia"
    },
    {
      title: "Untra - Winner of the 2009 Philadelphia 100® Awards",
      description: "Initial recognition for extraordinary growth in the technology services sector, establishing our reputation for excellence in the Philadelphia business community.",
      year: "2009",
      issuer: "The Wharton Small Business Development Center and The Entrepreneurs' Forum of Greater Philadelphia"
    }
  ];

  return (
    <PageContainer title="My Story">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-16 px-6 rounded-xl shadow-sm mb-16 overflow-hidden">
        <div className="absolute -top-24 -right-24 text-blue-200 dark:text-blue-900/40 opacity-30 pointer-events-none z-0 transform rotate-12">
          <BlobShape className="w-[300px] h-[300px]" />
        </div>
        <div className="absolute -bottom-24 -left-24 text-purple-200 dark:text-purple-900/40 opacity-30 pointer-events-none z-0 transform -rotate-12">
          <BlobShape className="w-[300px] h-[300px]" />
        </div>

        {/* Hero Images */}
        <div className="group relative w-full max-w-4xl mx-auto mb-8">
          <Image
            src="/images/mustafa-sualp-imsglobal-learning-analytics-summit-2019.png"
            alt="Mustafa Sualp at IMS Global Learning Analytics Summit 2019"
            width={1200}
            height={600}
            className="rounded-xl shadow-lg object-cover w-full h-auto grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0"
          />
          <div className="absolute top-4 right-4 w-40 md:w-60">
          <div className="group relative">
            <Image
              src="/images/mustafa-sualp-imsglobal-learning-analytics-summit-selfie-2019.png"
              alt="Close-up selfie of Mustafa Sualp speaking at the IMS Global Learning Analytics Summit 2019"
              width={300}
              height={200}
              className="rounded-xl shadow-lg object-cover w-full h-auto grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0"
            />
          </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
            From EdTech Pioneer to AI Collaboration Visionary: My journey has always been driven by a passion for innovations that unlock human potential.
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Professional Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            From EdTech Innovator to AI Collaboration Pioneer
          </p>
          <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              As a tech startup CEO with a proven track record, including a successful exit, 
              I am now focused on my latest venture—delivering easy AI-powered collaboration to everyone. 
              My career spans over two decades of building innovative solutions, leading teams, and creating value through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
            <HiLightBulb className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold">Professional Experience</h2>
        </div>

        <div className="relative ml-4">
          {/* Connection Line */}
          <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

          {/* Timeline entries */}
          <div className="space-y-12 stagger-fade-in">
            {timelineEntries.map((entry, index) => (
              <TimelineEntry
                key={index}
                company={entry.company}
                role={entry.role}
                period={entry.period}
                description={entry.description}
                highlight={entry.highlight}
                logo={entry.logo}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
            <HiAcademicCap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 stagger-fade-in">
          {education.map((edu, index) => (
            <EducationCard
              key={index}
              institution={edu.institution}
              degree={edu.degree}
              field={edu.field}
              period={edu.period}
              logo={edu.logo}
            />
          ))}
        </div>
      </section>
      
      {/* Awards Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
            <HiTrophy className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold">Honors & Awards</h2>
        </div>
        
        <div className="space-y-6 stagger-fade-in">
          {awards.map((award, index) => (
            <AwardCard
              key={index}
              title={award.title}
              description={award.description}
              year={award.year}
              issuer={award.issuer}
            />
          ))}
        </div>
      </section>
      
      {/* Skills Section - NEW */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
            <HiLightBulb className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold">Core Competencies</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 stagger-fade-in">
          {[
            "Startup Leadership",
            "Product Development",
            "Strategic Vision",
            "Capital Raising",
            "Team Building",
            "EdTech",
            "AI Solutions",
            "Cross-functional Leadership",
            "SaaS Business Models",
            "M&A Integration",
            "Bootstrap Growth",
            "Enterprise Software"
          ].map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <div className="my-12 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Interested in My Current Venture?</h2>
        <p className="mb-6">
          Sociail is redefining how teams collaborate with AI. Join our early access program to be among the first to experience it.
        </p>
        <CTAGroup 
          variant="inline" 
          primaryCTA="earlyAccess" 
          secondaryCTA="linkedin"
        />
      </div>
    </PageContainer>
  );
}
