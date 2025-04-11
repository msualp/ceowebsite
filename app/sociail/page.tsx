'use client';

import { useState } from 'react';
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
} from 'react-icons/hi2';

export default function JourneyPage() {
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
            alt="Sociail Logo"
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="relative inline-flex group">
              <a 
                href="#beta" 
                className="bg-blue-600 text-white px-8 py-4 rounded-md font-medium hover:bg-blue-700 transition-all transform hover:scale-105 group-hover:shadow-xl shadow-md"
              >
                Join Early Access
              </a>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                Limited Spots
              </span>
            </div>
            <a 
              href="/insights" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              Read Our Vision
            </a>
          </div>
          
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
      <section className="mt-20 mb-20 relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="absolute -left-3 top-8 w-1 h-24 bg-blue-600"></div>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Why We’re Building Sociail</h2>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 italic mb-6 leading-relaxed">
            "With the vast tools and understanding we've amassed, one would think it a simple matter 
            to transcend the boundaries of space and time in our collaborations, to harness AI as 
            a force for enhancing human connection, creation, and comprehension. 
            And yet, it remains an imperfect endeavor—a task unfinished—our ambitions outpace our present capacity."
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            This is precisely why I dedicate my days to cultivating a vision for Sociail—a vision that aspires 
            to uplift humanity, to forge spaces where minds meet, collaborate, and dream together. 
            My hope is that, with time and focus, we might elevate our lives through AI, 
            channeling our energies toward a human existence that feels not only vast but deeply interconnected.
          </p>
          <p className="text-right mt-4 text-sm text-gray-500 dark:text-gray-400">— Mustafa Sualp, Founder & CEO</p>
        </div>
      </section>

      {/* What is Sociail */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">What is Sociail?</h2>
        <div className="flex flex-col md:flex-row gap-10 mt-12 max-w-5xl mx-auto">
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
            <Image 
              src="/images/sociail-screenshot.png" 
              alt="Sociail Platform Interface" 
              width={600} 
              height={400}
              className="w-full h-auto object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Experience AI Collaboration</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Transform how your team works with intelligent AI assistants that adapt to your unique workflow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              title: "Multi-user Collaboration",
              description: "Work together in real-time with teammates and AI agents in the same contextual environment.",
              icon: HiUserGroup({ className: "w-6 h-6" }),
              color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
            },
            {
              title: "Contextual AI Integration",
              description: "AI that understands your conversations, retains context, and contributes meaningfully.",
              icon: HiCpuChip({ className: "w-6 h-6" }),
              color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
            },
            {
              title: "Adaptive Workflows",
              description: "Seamlessly integrate with your existing tools and processes to enhance productivity.",
              icon: HiCog6Tooth({ className: "w-6 h-6" }),
              color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
            },
            {
              title: "Enterprise Security",
              description: "End-to-end encryption, granular permissions, and complete data sovereignty.",
              icon: HiShieldCheck({ className: "w-6 h-6" }),
              color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300",
            },
          ].map(({ title, description, icon, color }, i) => (
            <div
              key={i}
              className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${color}`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Sociail is Different */}
      <section className="mt-24 relative overflow-hidden">
        <div className="absolute -left-40 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">How Sociail is Different</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 max-w-5xl mx-auto px-4">
          {[
            {
              title: "Beyond Chatbots",
              description: "Unlike siloed AI assistants, Sociail creates a shared context where multiple humans and AI agents collaborate simultaneously.",
              icon: HiChatBubbleLeftRight({ className: "w-6 h-6" }),
              color: "text-blue-600 dark:text-blue-400",
            },
            {
              title: "Context Preservation",
              description: "Our proprietary context layer maintains awareness across conversations, time, and team dynamics.",
              icon: HiLightBulb({ className: "w-6 h-6" }),
              color: "text-purple-600 dark:text-purple-400",
            },
            {
              title: "Collaborative Memory",
              description: "Knowledge isn’t isolated—it builds over time, creating a shared intelligence that enhances future collaboration.",
              icon: HiSparkles({ className: "w-6 h-6" }),
              color: "text-green-600 dark:text-green-400",
            },
          ].map(({ title, description, icon, color }, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
            >
              <div className={`mb-4 ${color}`}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

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
      <section className="mt-24 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-12">
          Sociail transforms AI from a solo experience into a powerful team multiplier through real-time, collaborative intelligence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {[
            {
              title: "Collaborative Intelligence",
              description: "We believe AI should enhance human capability—working with you, not replacing you. True potential is unlocked when humans and AI collaborate seamlessly.",
              icon: HiUsers({ className: "w-6 h-6" }),
              color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
            },
            {
              title: "Seamless Progression",
              description: "As your needs evolve from personal productivity to team collaboration to enterprise deployment, Sociail scales intuitively without disruption.",
              icon: HiArrowTrendingUp({ className: "w-6 h-6" }),
              color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300"
            },
            {
              title: "Adaptive Experience",
              description: "The platform learns from your interactions, adapting to your workflow and preferences over time to deliver increasingly valuable assistance.",
              icon: HiAdjustmentsHorizontal({ className: "w-6 h-6" }),
              color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
            },
            {
              title: "Trusted Partnership",
              description: "We design with privacy and security first, ensuring complete data sovereignty and transparent AI operations you can confidently bring into your organization.",
              icon: HiCheckBadge({ className: "w-6 h-6" }),
              color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300"
            }
          ].map(({ title, description, icon, color }, i) => (
            <div 
              key={i} 
              className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${color}`}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* Newsletter / Beta Sign-Up */}
      <section
        id="beta"
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl mt-24 shadow-md border border-blue-100 dark:border-blue-800/30 max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-semibold text-blue-600">
            Early Access Program
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Join the Sociail Journey</h2>
        <p className="mb-6 max-w-3xl">
          Be among the first to experience the future of AI collaboration. Sign up for our newsletter to 
          receive development updates, early access opportunities, and insights into how we&apos;re building Sociail.
        </p>

        {subscriptionStatus.submitted && subscriptionStatus.success ? (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
            <p>{subscriptionStatus.message}</p>
          </div>
        ) : (
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
            onSubmit={handleSubscribe}
          >
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 rounded border ${
                  emailError
                    ? 'border-red-500 dark:border-red-700'
                    : 'border-gray-300 dark:border-gray-700'
                } dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                aria-label="Email address"
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <p
                  className="text-red-500 text-sm mt-1"
                  id="email-error"
                >
                  {emailError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition-colors focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none"
            >
              Get Early Access
            </button>
          </form>
        )}
      </section>

      {/* Founders Image */}
      <div className="relative mt-24 max-w-4xl mx-auto">
        <img
          src="/images/mustafa-and-niaz.png"
          alt="Mustafa Sualp & Niaz"
          className="w-full rounded-xl shadow-lg object-cover grayscale"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center px-4 py-4 rounded-b-xl backdrop-blur-sm">
          <p className="font-medium mb-1">
            Meet Mustafa &amp; Niaz — Founders of Sociail
          </p>
          <p className="text-sm text-gray-300">
            Combining visionary leadership with engineering expertise to reinvent human-AI collaboration
          </p>
        </div>
      </div>

    </PageContainer>
  );
}
