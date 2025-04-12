

'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import {
  HiUserGroup,
  HiCpuChip,
  HiCog6Tooth,
  HiShieldCheck,
  HiUsers,
  HiArrowTrendingUp,
  HiAdjustmentsHorizontal,
  HiCheckBadge,
} from 'react-icons/hi2';

export default function SociailPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
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
    
    // Simulate subscription success
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
      <section
        className="py-20 px-4 text-center rounded-xl shadow-md relative bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "url('/images/sociail_light_static_bg_far_faded_no_clouds.png')",
        }}
      >
        <div className="dark:bg-[url('/images/sociail_dark_static_bg_far_faded_no_clouds.png')] absolute inset-0 bg-cover bg-no-repeat bg-center z-0" />
        <div className="relative z-10">
          <Image
            src="/images/sociail-logo-with-gray-stroke.svg"
            alt="Sociail Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            AI-Powered Collaboration
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Reimagine how humans and AI collaborate — real-time, multi-user, multi-agent, and workflow-aware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <div className="relative inline-flex">
              <a 
                href="#beta" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Join Early Access
              </a>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                Limited Spots
              </span>
            </div>
            <a 
              href="/insights" 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
            >
              Read Insights
            </a>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Experience AI Collaboration</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Transform how your team works with intelligent AI assistants that adapt to your unique workflow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              title: "Multi-user Collaboration",
              description: "Collaborate in real time with your team.",
              icon: HiUserGroup({ size: 24 }),
              color: "bg-blue-100 text-blue-600",
            },
            {
              title: "Advanced AI Models",
              description: "Choose the right AI for every task.",
              icon: HiCpuChip({ size: 24 }),
              color: "bg-purple-100 text-purple-600",
            },
            {
              title: "Workflow Automation",
              description: "Automate routine tasks with ease.",
              icon: HiCog6Tooth({ size: 24 }),
              color: "bg-green-100 text-green-600",
            },
            {
              title: "Enterprise-grade Security",
              description: "Control permissions and protect your data.",
              icon: HiShieldCheck({ size: 24 }),
              color: "bg-orange-100 text-orange-600",
            },
          ].map(({ title, description, icon, color }, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-sm backdrop-blur-sm transition hover:shadow-md"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 text-2xl font-bold ${color}`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-6 max-w-3xl mx-auto text-center">
        Sociail is the first collaborative AI platform enabling real-time interaction between multiple users and AI agents in a shared, context-rich environment.
      </p>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">What is Sociail?</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Sociail transforms how teams work with AI by enabling real-time, multi-agent collaboration in shared workspaces.
          It maintains context, coordinates conversations, and helps teams think, build, and decide together.
        </p>
      </section>

      <section className="mt-16 grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🌟 Our Vision</h3>
          <p>To make AI collaboration ubiquitous—from individuals to enterprises—so humans and AI can partner to do more than either could alone.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🤝 Our Mission</h3>
          <p>To eliminate siloed AI usage by enabling seamless, scalable collaboration with AI that grows with your needs—from solo to team to enterprise.</p>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Our Core Values & Differentiators</h2>
        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-10">
          Sociail transforms AI from a solo experience into a powerful team multiplier through real-time, collaborative AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            {
              title: "Collaborative Intelligence",
              description: "AI that enhances human capability—working with you, not replacing you.",
              icon: HiUsers({ size: 24 }),
              color: "bg-blue-100 text-blue-600"
            },
            {
              title: "Seamless Progression",
              description: "From solo use to enterprise adoption, Sociail scales with your journey.",
              icon: HiArrowTrendingUp({ size: 24 }),
              color: "bg-green-100 text-green-600"
            },
            {
              title: "Adaptive Experience",
              description: "The platform learns and adapts to your workflow over time.",
              icon: HiAdjustmentsHorizontal({ size: 24 }),
              color: "bg-purple-100 text-purple-600"
            },
            {
              title: "Trusted Partnership",
              description: "Enterprise-grade security and full control of your data.",
              icon: HiCheckBadge({ size: 24 }),
              color: "bg-orange-100 text-orange-600"
            }
          ].map(({ title, description, icon, color }, i) => (
            <div key={i} className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 text-2xl font-bold ${color}`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="beta" className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-semibold">Newsletter Sign-Up</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Stay in the Loop with Sociail</h2>
        <p className="mb-6">
          Want early insights into the future of collaborative AI? Sign up for our newsletter to receive updates, feature releases, and insider stories as we build.
        </p>
        
        {subscriptionStatus.submitted && subscriptionStatus.success ? (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
            <p>{subscriptionStatus.message}</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 rounded border ${emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} dark:bg-gray-800`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
      
      <div className="relative mt-16 max-w-4xl mx-auto">
        <img
          src="/images/mustafa-and-niaz.png"
          alt="Mustafa Sualp & Niaz"
          className="w-full rounded-xl shadow-md object-cover grayscale"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          Meet Mustafa & Niaz — Founders of Sociail, where bold vision meets engineering precision.
        </div>
      </div>
      
    </PageContainer>
  );
}
