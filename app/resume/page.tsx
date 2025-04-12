'use client';

import { useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import TimelineEntry from '@/components/TimelineEntry';
import EducationCard from '@/components/EducationCard';
import SkillBadge from '@/components/SkillBadge';
import AwardCard from '@/components/AwardCard';
import { HiDocumentDownload, HiAcademicCap, HiLightBulb } from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';

export default function ResumePage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);
  return (
    <PageContainer title="Resume">
      <div className="flex justify-between items-center mb-8">
        <div></div> {/* Empty div for flex spacing since title is in PageContainer */}
        <Button 
          href="/resume/mustafa-sualp-resume.pdf" 
          variant="primary"
          icon={<HiDocumentDownload className="h-5 w-5" />}
          iconPosition="left"
        >
          Download PDF
        </Button>
      </div>
      
      <div className="max-w-none fade-in-scroll">
        <Section background="none" spacing="sm" className="mb-8">
          <SectionHeading 
            title="Professional Summary" 
            icon={<HiLightBulb className="w-6 h-6 text-blue-600" />}
          />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Serial entrepreneur and technology executive with 15+ years of experience building and scaling 
            software companies. Proven track record of leading teams from concept to acquisition, with expertise 
            in AI, SaaS, and EdTech. Currently focused on developing AI-powered collaboration tools that 
            enhance human potential.
          </p>
        </Section>
        
        <Section background="none" spacing="sm" className="mb-8">
          <SectionHeading 
            title="Experience" 
            icon={<HiLightBulb className="w-6 h-6 text-blue-600" />}
          />
          
          <div className="space-y-6 stagger-fade-in">
            <TimelineEntry
              company="Sociail, Inc."
              role="CEO & Founder"
              period="March 2023 - Present"
              description={[
                "Leading development of an AI-powered collaboration platform that seamlessly integrates into daily workflows",
                "Raised seed funding from top-tier investors",
                "Built founding team of engineers, designers, and AI researchers",
                "Established strategic partnerships with enterprise clients for beta testing"
              ]}
              highlight="Revolutionary AI Collaboration Platform"
              logo="/images/sociail-logo-with-gray-stroke.svg"
              index={0}
            />
            
            <TimelineEntry
              company="HelioCampus"
              role="Vice President, Assessment Solutions"
              period="September 2021 - June 2022"
              description={[
                "Led post-acquisition integration of AEFIS into HelioCampus",
                "Managed product strategy and roadmap for assessment management solutions",
                "Oversaw customer success and retention during transition",
                "Collaborated with executive team on overall company strategy"
              ]}
              highlight="Successful Post-Acquisition Integration"
              index={1}
            />
            
            <TimelineEntry
              company="AEFIS, Inc."
              role="CEO & Founder"
              period="October 2012 - June 2022"
              description={[
                "Built and scaled a market-leading assessment management platform for higher education",
                "Grew from bootstrapped startup to successful acquisition by HelioCampus in 2021",
                "Developed innovative solutions for learning outcomes assessment, curriculum mapping, and accreditation",
                "Established partnerships with major higher education associations and technology providers",
                "Led team of 30+ across product, engineering, sales, and customer success"
              ]}
              highlight="Bootstrap to Successful Exit"
              index={2}
            />
            
            <TimelineEntry
              company="UNTRA Corporation"
              role="CEO & Founder"
              period="April 1999 - December 2017"
              description={[
                "Founded and led managed technology services company serving financial services clients",
                "Provided enterprise software development, infrastructure solutions, and team augmentation",
                "Recognized twice as one of the Philadelphia 100® fastest growing companies",
                "Incubated and funded early development of AEFIS"
              ]}
              highlight="Bootstrapped Tech Services Growth"
              index={3}
            />
          </div>
        </Section>
        
        <Section background="none" spacing="sm" className="mb-8">
          <SectionHeading 
            title="Education" 
            icon={<HiAcademicCap className="w-6 h-6 text-blue-600" />}
          />
          
          <div className="grid md:grid-cols-2 gap-6 stagger-fade-in">
            <EducationCard
              institution="Massachusetts Institute of Technology"
              degree="Professional Education"
              field="Artificial Intelligence & Machine Learning"
              period="January 2023 - May 2023"
              logo="/images/mit-logo.svg"
            />
            
            <EducationCard
              institution="Drexel University's LeBow College of Business"
              degree="B.S."
              field="Commerce and Engineering"
              period="August 1994 - June 1999"
              logo="/images/drexel-logo.svg"
            />
          </div>
        </Section>
        
        <Section background="none" spacing="sm" className="mb-8">
          <SectionHeading 
            title="Skills" 
            icon={<HiLightBulb className="w-6 h-6 text-blue-600" />}
          />
          
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3">Leadership</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 stagger-fade-in">
              <SkillBadge skill="Strategic Planning" />
              <SkillBadge skill="Team Building" />
              <SkillBadge skill="Product Vision" />
              <SkillBadge skill="Fundraising" />
              <SkillBadge skill="M&A Strategy" />
              <SkillBadge skill="Investor Relations" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Technical</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 stagger-fade-in">
              <SkillBadge skill="AI/ML Development" />
              <SkillBadge skill="SaaS Architecture" />
              <SkillBadge skill="Enterprise Software" />
              <SkillBadge skill="Data Analytics" />
              <SkillBadge skill="Cloud Infrastructure" />
              <SkillBadge skill="Product Management" />
            </div>
          </div>
        </Section>
        
        <Section background="none" spacing="sm">
          <SectionHeading 
            title="Awards & Recognition" 
            icon={<HiTrophy className="w-6 h-6 text-blue-600" />}
          />
          
          <div className="space-y-4 stagger-fade-in">
            <AwardCard
              title="Philadelphia 100® Award - AEFIS"
              description="Recognition for being one of the fastest growing companies in the Philadelphia region."
              year="2016"
              issuer="The Wharton Small Business Development Center"
            />
            
            <AwardCard
              title="Philadelphia 100® Award - UNTRA Corporation"
              description="Recognized twice as one of the fastest growing companies in the Philadelphia region."
              year="2009, 2017"
              issuer="The Wharton Small Business Development Center"
            />
            
            <AwardCard
              title="EdTech Breakthrough Award"
              description="Recognized for innovation in educational technology solutions."
              year="2020"
              issuer="EdTech Breakthrough Awards"
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
