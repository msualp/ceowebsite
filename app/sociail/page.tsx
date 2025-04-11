'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PageContainer } from '@/components/PageContainer';
import {
  HiUserGroup,
  HiCpuChip,
  HiCog6Tooth,
  HiShieldCheck,
  HiUsers,
  HiArrowTrendingUp,
  HiAdjustmentsHorizontal,
  HiCheckBadge,
  HiLightBulb,
  HiSparkles,
  HiChatBubbleLeftRight,
  HiArrowLongRight,
} from 'react-icons/hi2';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import { CTAGroup } from '@/components/cta/CTAGroup';
import { EarlyAccessCTA } from '@/components/cta/EarlyAccessCTA';
import FeatureCard from '@/components/FeatureCard';
import ValueCard from '@/components/ValueCard';
import Quote from '@/components/Quote';

export default function SociailPage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Validate & update the email field
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  // Simulate subscription form submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Simulate success
    setSubscriptionStatus({
      submitted: true,
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });

    // Reset form
    setEmail('');
  };

  return (
    <PageContainer title="Sociail Vision">
      {/* Hero Section */}
      <section
        className="py-24 px-4 text-center rounded-xl shadow-md relative bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/sociail_light_static_bg_far_faded_no_clouds.png')",
        }}
      >
        {/* Dark mode background image overlay */}
        <div className="dark:bg-[url('/images/sociail_dark_static_bg_far_faded_no_clouds.png')] absolute inset-0 bg-cover bg-no-repeat bg-center z-0" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-x z-0"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Image
            src="/images/sociail-logo-with-gray-stroke.svg"
            alt="Sociail company logo, representing the AI collaboration platform"
            width={120}
            height={120}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            The Next Generation <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI Collaboration Platform
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Reinventing how humans and AI work together—real-time, multi-user, context-aware, 
            and designed to amplify your team’s collective intelligence.
          </p>
          <CTAGroup 
            variant="hero" 
            primaryCTA="earlyAccess" 
            primaryLabel="Join Our Beta"
            secondaryCTA="calendly" 
            secondaryLabel="Request a Demo"
            className="mb-8"
          />
          
          {/* Quick stats */}
          <div className="flex justify-center gap-8 mt-12 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-blue-600">$600K+</span>
              <span>Investment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-blue-600">2</span>
              <span>Years Development</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-blue-600">Q2 2025</span>
              <span>Early Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Care (Vision Statement) */}
      <Section background="none" spacing="lg" className="mt-20 mb-20 relative overflow-hidden fade-in-scroll">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <SectionHeading 
          title="Why We're Building Sociail" 
          icon={<HiLightBulb className="w-6 h-6 text-blue-600" />}
          className="mb-6"
        />
        
        <Quote
          quote="With the vast tools and understanding we've amassed, one would think it a simple matter 
          to transcend the boundaries of space and time in our collaborations, to harness AI as 
          a force for enhancing human connection, creation, and comprehension. 
          And yet, it remains an imperfect endeavor—a task unfinished—our ambitions outpace our present capacity."
          author="Mustafa Sualp"
          role="Founder & CEO"
          className="mb-6"
        />
        
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          This is precisely why I dedicate my days to cultivating a vision for Sociail—a vision that aspires 
          to uplift humanity, to forge spaces where minds meet, collaborate, and dream together. 
          My hope is that, with time and focus, we might elevate our lives through AI, 
          channeling our energies toward a human existence that feels not only vast but deeply interconnected.
        </p>
      </Section>

      {/* What is Sociail */}
      <Section background="none" spacing="lg" className="mt-20">
        <SectionTitle 
          title="What is Sociail?" 
          className="mb-8"
        />
        
        <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto fade-in-scroll">
          <div className="md:w-1/2 text-left">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Sociail is a <strong className="text-blue-600">real-time collaborative AI platform</strong> that fundamentally redefines how modern teams create, decide, and deliver.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-4">
              Built on the Matrix protocol and enhanced with our proprietary contextual AI integration layer, 
              Sociail creates an environment where humans and AI agents collaborate seamlessly in shared workspaces—maintaining context, 
              coordinating conversations, and amplifying collective intelligence.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-4">
              Unlike isolated AI tools, Sociail embeds intelligence directly into natural team workflows, 
              creating a multiplier effect on productivity and innovation.
            </p>
          </div>
          <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <div className="img-with-caption relative">
              <Image 
                src="/images/sociail-screenshot.png" 
                alt="Screenshot of Sociail's collaborative AI platform interface showing multi-user chat and AI integration features" 
                width={600} 
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="caption-reveal">
                Sociail's intuitive interface combines chat, AI assistance, and collaborative tools in one workspace
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Key Features */}
      <Section background="none" spacing="lg" className="mt-24 text-center">
        <SectionTitle 
          title="Experience AI Collaboration" 
          subtitle="Transform how your team works with intelligent AI assistants that adapt to your unique workflow."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left stagger-fade-in">
          {[
            {
              title: "Multi-user Collaboration",
              description: "Work together in real-time with teammates and AI agents in the same contextual environment.",
              icon: <HiUserGroup className="w-6 h-6" />,
              color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
            },
            {
              title: "Contextual AI Integration",
              description: "AI that understands your conversations, retains context, and contributes meaningfully.",
              icon: <HiCpuChip className="w-6 h-6" />,
              color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
            },
            {
              title: "Adaptive Workflows",
              description: "Seamlessly integrate with your existing tools and processes to enhance productivity.",
              icon: <HiCog6Tooth className="w-6 h-6" />,
              color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
            },
            {
              title: "Enterprise Security",
              description: "End-to-end encryption, granular permissions, and complete data sovereignty.",
              icon: <HiShieldCheck className="w-6 h-6" />,
              color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300",
            },
          ].map(({ title, description, icon, color }, i) => (
            <FeatureCard
              key={i}
              title={title}
              description={description}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </Section>

      {/* How Sociail is Different */}
      <Section background="none" spacing="lg" className="mt-24 relative overflow-hidden">
        <div className="absolute -left-40 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <SectionTitle 
          title="How Sociail is Different" 
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 max-w-5xl mx-auto stagger-fade-in">
          {[
            {
              title: "Beyond Chatbots",
              description: "Unlike siloed AI assistants, Sociail creates a shared context where multiple humans and AI agents collaborate simultaneously.",
              icon: <HiChatBubbleLeftRight className="w-6 h-6" />,
              color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
            },
            {
              title: "Context Preservation",
              description: "Our proprietary context layer maintains awareness across conversations, time, and team dynamics.",
              icon: <HiLightBulb className="w-6 h-6" />,
              color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
            },
            {
              title: "Collaborative Memory",
              description: "Knowledge isn't isolated—it builds over time, creating a shared intelligence that enhances future collaboration.",
              icon: <HiSparkles className="w-6 h-6" />,
              color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
            },
          ].map(({ title, description, icon, color }, i) => (
            <FeatureCard
              key={i}
              title={title}
              description={description}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </Section>

      {/* Mission and Vision */}
      <section className="mt-24 grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto text-left px-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
            <span className="text-2xl">🌟</span> Our Vision
          </h3>
          <p className="text-gray-800 dark:text-gray-200 text-lg">
            To create a world where AI collaboration is ubiquitous and natural—enabling humans and AI to achieve together what neither could alone.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
            <span className="text-2xl">🤝</span> Our Mission
          </h3>
          <p className="text-gray-800 dark:text-gray-200 text-lg">
            To eliminate siloed AI usage by enabling seamless, scalable collaboration with AI that grows with your needs—from solo to team to enterprise.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <Section background="none" spacing="lg" className="mt-24">
        <SectionTitle 
          title="Our Core Values" 
          subtitle="Sociail transforms AI from a solo experience into a powerful team multiplier through real-time, collaborative intelligence."
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto stagger-fade-in">
          {[
            {
              title: "Collaborative Intelligence",
              description: "We believe AI should enhance human capability—working with you, not replacing you. True potential is unlocked when humans and AI collaborate seamlessly.",
              icon: <HiUsers className="w-6 h-6" />,
              color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
            },
            {
              title: "Seamless Progression",
              description: "As your needs evolve from personal productivity to team collaboration to enterprise deployment, Sociail scales intuitively without disruption.",
              icon: <HiArrowTrendingUp className="w-6 h-6" />,
              color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300"
            },
            {
              title: "Adaptive Experience",
              description: "The platform learns from your interactions, adapting to your workflow and preferences over time to deliver increasingly valuable assistance.",
              icon: <HiAdjustmentsHorizontal className="w-6 h-6" />,
              color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
            },
            {
              title: "Trusted Partnership",
              description: "We design with privacy and security first, ensuring complete data sovereignty and transparent AI operations you can confidently bring into your organization.",
              icon: <HiCheckBadge className="w-6 h-6" />,
              color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300"
            }
          ].map(({ title, description, icon, color }, i) => (
            <ValueCard
              key={i}
              title={title}
              description={description}
              icon={icon}
              iconBgColor={color}
            />
          ))}
        </div>
      </Section>

      {/* Status Update */}
      <section className="mt-24 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-8 shadow-md max-w-5xl mx-auto border border-blue-100 dark:border-blue-800/30">
        <h2 className="text-2xl font-bold mb-6">Current Status</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Where We Are</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>MVP development complete ($600K invested)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Core platform with real-time AI collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Matrix protocol integration with custom extensions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">◯</span>
                <span>Beta launch preparations underway</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">What&apos;s Next</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">◯</span>
                <span>Q2 2025: Early access beta launch (1,000-10,000 users)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">◯</span>
                <span>Q3 2025: Product refinement based on user feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">◯</span>
                <span>Q4 2025: Public launch with initial monetization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">◯</span>
                <span>2026: Enterprise features and expanded capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section id="beta" className="mt-24 max-w-5xl mx-auto">
        <EarlyAccessCTA 
          variant="prominent" 
          showCounter={true}
          className="mt-16" 
        />
      </section>

      {/* Founders Image */}
      <div className="relative mt-24 max-w-4xl mx-auto fade-in-scroll">
        <div className="img-with-caption relative">
          <Image
            src="/images/mustafa-and-niaz.png"
            alt="Mustafa Sualp and Niaz, co-founders of Sociail, collaborating on the AI platform development"
            width={1200}
            height={600}
            className="w-full rounded-xl shadow-lg object-cover"
          />
          <div className="caption-reveal">
            <p className="font-medium mb-1">
              Meet Mustafa &amp; Niaz — Founders of Sociail
            </p>
            <p className="text-sm text-gray-300">
              Combining visionary leadership with engineering expertise to reinvent human-AI collaboration
            </p>
          </div>
        </div>
      </div>

    </PageContainer>
  );
}
