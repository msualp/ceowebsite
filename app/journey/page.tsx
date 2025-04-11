'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PageContainer } from '@/components/PageContainer';
import { BlobShape } from '@/components/SvgShapes';
import {
  HiLightBulb,
  HiAcademicCap,
  HiTrophy,
  HiChevronRight,
  HiArrowLongRight,
} from 'react-icons/hi2';

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

  // Animation for timeline entries
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineDomEntries = document.querySelectorAll('.timeline-entry');
    timelineDomEntries.forEach((el) => observer.observe(el));

    return () => {
      timelineDomEntries.forEach((el) => observer.unobserve(el));
    };
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
              alt="Mustafa Sualp Selfie at IMS Global 2019"
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
          <div className="space-y-12">
            {timelineEntries.map((entry, index) => (
              <div 
                key={index} 
                className="timeline-entry opacity-0 translate-y-4 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative pl-16">
                  {/* Timeline node */}
                    <div className="absolute left-0 top-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-600 dark:border-blue-500 flex items-center justify-center shadow-md">
                    {entry.logo ? (
                      <div className="group relative">
                        <Image 
                          src={entry.logo} 
                          alt={entry.company} 
                          width={30} 
                          height={30} 
                          className="rounded-xl shadow-lg object-cover w-full h-auto grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                        <HiLightBulb className="w-6 h-6" />
                      </div>
                    )}
                    </div>
                  
                  {/* Content card */}
                  <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{entry.company}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{entry.role}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full text-sm font-medium">
                          {entry.period}
                        </span>
                      </div>
                    </div>
                    
                    {/* Highlight quote */}
                    <div className="border-l-4 border-blue-500 pl-4 italic text-blue-700 dark:text-blue-300 mb-4">
                      "{entry.highlight}"
                    </div>
                    
                    {showHighlights[index] && (
                      <div className="space-y-2 text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {entry.description.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => toggleHighlight(index)}
                      className="mt-3 text-sm text-blue-600 dark:text-blue-400 underline"
                    >
                      {showHighlights[index] ? "Hide Details" : "View Highlights"}
                    </button>
                  </div>
                </div>
              </div>
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
        
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 flex"
            >
              <div className="mr-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/40">
                  <HiAcademicCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                <p className="text-blue-600 dark:text-blue-400">{edu.degree}, {edu.field}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.period}</p>
              </div>
            </div>
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
        
        <div className="space-y-6">
          {awards.map((award, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  🏆 {award.title}
                </h3>
                <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full text-sm font-medium mt-2 md:mt-0">
                  {award.year}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Issued by {award.issuer}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{award.description}</p>
            </div>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center hover:shadow-md hover:border-green-400 transition-all duration-300"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-800 dark:text-gray-200 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section - NEW */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Connect About AI Collaboration?</h2>
          <p className="mb-6 text-blue-100">
            I'm always interested in connecting with fellow entrepreneurs, AI enthusiasts, and potential partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/sualp/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              Connect on LinkedIn
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://calendly.com/msualp/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-700 px-6 py-3 rounded-md font-medium hover:bg-purple-50 transition-colors flex items-center justify-center"
            >
              Book a Call <HiArrowLongRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="mailto:msualp@sociail.com" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
