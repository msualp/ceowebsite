'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { BlobShape } from '@/components/SvgShapes';
import {
  HiUserGroup,
  HiCpuChip,
  HiLightBulb,
  HiArrowLongRight,
  HiChevronDown,
  HiChevronUp,
  HiAcademicCap,
  HiPuzzlePiece,
  HiChatBubbleLeftRight,
  HiDocumentText,
  HiCalendar,
  HiSparkles,
  HiBeaker,
} from 'react-icons/hi2';

// Types for our research topic cards
type ResearchTopic = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

// Types for our thought leadership content
type ThoughtLeadershipPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  image?: string;
};

export default function CollaborativeAIPage() {
  // State for email subscription
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for animation on scroll
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    definition: false,
    vision: false,
    research: false,
    insights: false,
    collaboration: false
  });

  // Validate email function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
  
  // Handle form submission
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
      message: 'Thank you for subscribing! You\'ll be the first to receive our Collaborative AI insights.'
    });
    
    // Reset form
    setEmail('');
  };
  
  // Function to toggle FAQ items
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Add scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections(prev => ({
              ...prev,
              [id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  
  // Research topics data
  const researchTopics: ResearchTopic[] = [
    {
      title: "Multi-Agent Collaboration",
      description: "Exploring how multiple AI agents with different capabilities can collaborate to solve complex problems, similar to human teams with diverse expertise.",
      icon: <HiUserGroup className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
    },
    {
      title: "Context-Aware AI Systems",
      description: "Developing AI that maintains awareness across conversations, time, and team dynamics to enable more natural and effective collaboration.",
      icon: <HiCpuChip className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
    },
    {
      title: "Human-AI Co-Creation",
      description: "Studying the creative potential of human-AI partnerships and how they can generate novel ideas and solutions beyond what either could produce alone.",
      icon: <HiLightBulb className="w-6 h-6" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
    },
    {
      title: "Collaborative Memory Systems",
      description: "Building systems that create and maintain shared knowledge between humans and AI, enabling deeper collaboration over time.",
      icon: <HiPuzzlePiece className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300",
    },
    {
      title: "Interface Design for AI Collaboration",
      description: "Researching optimal interface paradigms that make AI collaboration feel natural and intuitive for human users.",
      icon: <HiChatBubbleLeftRight className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300",
    },
    {
      title: "Ethical Frameworks for Collaborative AI",
      description: "Developing principles and practices to ensure collaborative AI systems are transparent, accountable, and aligned with human values.",
      icon: <HiAcademicCap className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300",
    },
  ];

  // Thought leadership content
  const thoughtLeadershipPosts: ThoughtLeadershipPost[] = [
    {
      title: "The Third Wave of Collaboration: Why AI + Human Teams Will Redefine Productivity",
      excerpt: "Exploring how collaboration has evolved from in-person to digital, and now to AI-augmented teamwork. This new paradigm represents a fundamental shift in how we work and create.",
      date: "April 5, 2025",
      slug: "third-wave-collaboration",
      category: "Future of Work",
      image: "/images/third-wave-collaboration.png"
    },
    {
      title: "The Invisible Integration: Why AI Should Feel Like a Natural Extension of Teams",
      excerpt: "Effective AI collaboration requires seamless integration into existing workflows. This article examines how interface design choices impact adoption and effectiveness.",
      date: "March 18, 2025",
      slug: "invisible-integration",
      category: "Design",
      image: "/images/invisible-integration.png"
    },
    {
      title: "Beyond the AI Assistant: The Coming Era of Collaborative Intelligence",
      excerpt: "Moving past the limited 'assistant' paradigm toward true collaborative partnerships between humans and AI systems with complementary capabilities.",
      date: "February 22, 2025",
      slug: "beyond-ai-assistant",
      category: "AI Research",
      image: "/images/beyond-ai-assistant.png"
    },
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "What is Collaborative AI?",
      answer: "Collaborative AI refers to artificial intelligence systems designed to work alongside humans as partners rather than just tools. These systems maintain awareness of context, adapt to human needs, and contribute meaningfully to shared goals. Unlike traditional AI that simply responds to queries or performs isolated tasks, collaborative AI actively participates in the creative and problem-solving process."
    },
    {
      question: "How is this different from current AI assistants?",
      answer: "Current AI assistants primarily operate in a request-response mode, with each interaction treated largely in isolation. Collaborative AI maintains context across interactions, understands team dynamics, adapts to specific workflows, and contributes proactively rather than just reactively. It's designed for sustained participation in complex projects rather than one-off tasks."
    },
    {
      question: "What research opportunities exist in this field?",
      answer: "The field of Collaborative AI offers numerous research opportunities, including multi-agent systems, context-aware AI, collaborative memory architectures, natural interface design, creative co-production, ethical frameworks for collaboration, and measuring the effectiveness of human-AI teams. We welcome research collaborations in these areas and are particularly interested in real-world applications."
    },
    {
      question: "How can I collaborate with you on Collaborative AI research?",
      answer: "We welcome collaborations with academic researchers, industry professionals, and other interested parties. You can reach out through our Contact page to discuss potential research partnerships, joint publications, or other collaborative opportunities. We're especially interested in interdisciplinary approaches that combine technical AI research with insights from fields like psychology, design, and organizational behavior."
    },
    {
      question: "What ethical considerations are important for Collaborative AI?",
      answer: "Key ethical considerations include transparency about AI capabilities and limitations, clear attribution of contributions between humans and AI, privacy of collaborative data, potential impacts on employment and work satisfaction, accessibility across diverse populations, and governance frameworks for responsible deployment. We believe ethical considerations should be integrated from the beginning of system design, not added as an afterthought."
    }
  ];

  return (
    <PageContainer title="Collaborative AI">
      {/* Hero Section */}
      <section 
        id="hero" 
        className={`animate-section relative pt-16 pb-20 px-4 md:pt-20 md:pb-24 text-center overflow-hidden
          ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out`}
      >
        {/* Background decorative elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 text-blue-200 dark:text-blue-900/30 opacity-20 pointer-events-none transform rotate-12">
          <BlobShape className="w-[250px] h-[250px]" />
        </div>
        <div className="absolute bottom-1/4 right-0 text-purple-200 dark:text-purple-900/30 opacity-20 pointer-events-none transform -rotate-12">
          <BlobShape className="w-[250px] h-[250px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            The Future of Human-AI Partnership
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Collaborative AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Pioneering the next frontier in human-AI collaboration—where artificial intelligence becomes a true partner in creative and problem-solving endeavors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#research-topics" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Explore Research Topics
            </a>
            <a 
              href="#collaboration" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              Collaborate With Us
            </a>
          </div>
          
          {/* Featured image */}
          <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-xl">
            <Image 
              src="/images/collaborative-ai-hero.png" 
              alt="Collaborative AI Concept" 
              width={1200} 
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
              <p className="text-sm md:text-base max-w-2xl">
                From EdTech Pioneer to AI Collaboration Visionary: My journey has always been driven by a passion for innovations that unlock human potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section 
        id="definition" 
        className={`animate-section relative py-20 px-4 md:py-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm my-16
          ${visibleSections.definition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out delay-300`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">What is Collaborative AI?</h2>
          
          <div className="prose dark:prose-invert prose-lg max-w-none mb-12">
            <p>
              <strong className="text-blue-600 dark:text-blue-400">Collaborative AI</strong> represents a fundamental shift in how we think about artificial intelligence—moving from tools we use to partners we work with. Unlike traditional AI systems that simply respond to queries or perform isolated tasks, collaborative AI actively participates in the creative and problem-solving process alongside humans.
            </p>
            
            <p>
              At its core, collaborative AI is characterized by:
            </p>
            
            <ul>
              <li><strong>Context Awareness</strong>: Maintaining understanding across conversations, time, and team dynamics</li>
              <li><strong>Bi-directional Learning</strong>: Both the AI and humans adapt to each other over time</li>
              <li><strong>Complementary Capabilities</strong>: Leveraging the distinct strengths of human and artificial intelligence</li>
              <li><strong>Shared Goals</strong>: Working toward common objectives with aligned incentives</li>
              <li><strong>Seamless Integration</strong>: Fitting naturally into human workflows rather than disrupting them</li>
            </ul>
            
            <p>
              This approach transforms AI from a tool that we direct to accomplish specific tasks into a collaborative partner that contributes its unique capabilities to shared endeavors. The result is a new kind of intelligence—neither purely human nor purely artificial, but a hybrid that achieves outcomes neither could reach alone.
            </p>
          </div>
          
          {/* Key distinctions grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Traditional AI Approaches</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Isolated interactions without persistent context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Primarily reactive to explicit human requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Limited ability to understand team dynamics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Separate from existing workflows</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Collaborative AI Approach</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Maintains awareness across conversations and time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Proactively contributes based on context understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Adapts to team dynamics and individual preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Seamlessly integrates with existing collaborative environments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section 
        id="vision" 
        className={`animate-section relative py-20 px-4 md:py-24
          ${visibleSections.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out delay-300`}
      >
        <div className="absolute -left-40 -top-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision for Collaborative AI</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We envision a future where the boundaries between human and artificial intelligence blur, creating a new paradigm of collaborative intelligence.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="mb-8 md:flex md:items-center md:gap-8">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <Image 
                src="/images/collaborative-intelligence.png" 
                alt="Collaborative Intelligence Concept" 
                width={400} 
                height={400} 
                className="rounded-xl mx-auto"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">From Tools to Partners</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The history of technology has been about creating tools that extend human capabilities. Collaborative AI represents the next evolutionary step—technology that doesn't just extend our capabilities but actively participates in the creative and problem-solving process alongside us.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                This shift fundamentally changes how we approach tasks, make decisions, and create new solutions. Rather than simply directing AI to perform specific functions, we engage with it as a collaborative partner with complementary strengths and perspectives.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Key Principles of Our Vision</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <HiUserGroup className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Human-Centered</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Collaborative AI enhances human capabilities rather than replacing them, putting people at the center of the experience.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4">
                  <HiLightBulb className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Contextually Intelligent</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Systems that understand the broader context of work, maintaining awareness across conversations, time, and team dynamics.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                  <HiChatBubbleLeftRight className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Naturally Integrated</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Collaborative AI feels like a natural extension of how people already work rather than requiring significant adaptation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Topics Section */}
      <section 
        id="research-topics" 
        className={`animate-section relative py-20 px-4 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl my-16
          ${visibleSections.research ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out delay-300`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Topics</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our research agenda focuses on six key areas that will define the future of Collaborative AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${topic.color}`}>
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/insights/research" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View our detailed research agenda
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Thought Leadership Section */}
      <section 
        id="insights" 
        className={`animate-section relative py-20 px-4 md:py-24
          ${visibleSections.insights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out delay-300`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our perspectives on the evolving landscape of Collaborative AI
            </p>
          </div>
          
          {/* Insights Tiers Container */}
          <div className="space-y-12 stagger-fade-in">
            {/* FEATURED INSIGHT */}
            <div className="mac-glass p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
              
              {/* Tier Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                  <HiSparkles className="mr-1.5" />
                  FEATURED INSIGHT
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-2/5 lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-xl"></div>
                  <Image
                    src={thoughtLeadershipPosts[0].image || "/images/blog/placeholder.jpg"}
                    alt={thoughtLeadershipPosts[0].title}
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full h-auto hover:scale-[1.03] transition-transform duration-300 relative z-10"
                  />
                </div>
                <div className="w-full md:w-3/5 lg:w-1/2">
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">{thoughtLeadershipPosts[0].title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg">
                    {thoughtLeadershipPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">{thoughtLeadershipPosts[0].category}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                      <HiCalendar className="mr-1.5 w-4 h-4" />
                      {thoughtLeadershipPosts[0].date}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Link 
                      href={`/insights/${thoughtLeadershipPosts[0].slug}`} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white h-10 py-2 px-4"
                    >
                      Read full article
                      <HiArrowLongRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* RECENT ARTICLES */}
            <div className="mac-glass p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
              
              {/* Tier Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                  <HiBeaker className="mr-1.5" />
                  RECENT ARTICLES
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {thoughtLeadershipPosts.slice(1).map((post, index) => (
                  <div key={index} className="mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-700/40 group hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]">
                    <div className="rounded-lg overflow-hidden shadow-sm mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 z-10"></div>
                      <Image
                        src={post.image || "/images/blog/placeholder.jpg"}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-500 transition-colors duration-300">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded-full text-sm font-medium">{post.category}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2.5 py-0.5 rounded-full text-sm font-medium inline-flex items-center">
                        <HiCalendar className="mr-1 w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <Link 
                      href={`/insights/${post.slug}`} 
                      className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center"
                    >
                      Read article
                      <HiArrowLongRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* EXPLORE MORE */}
            <div className="mac-glass p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-teal-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
              
              {/* Tier Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                  <HiLightBulb className="mr-1.5" />
                  EXPLORE MORE
                </div>
              </div>
              
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Discover More Insights</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  Explore our complete collection of articles on AI collaboration, entrepreneurship, product vision, and the future of work. Gain valuable insights to help you navigate the rapidly evolving technological landscape.
                </p>
                <Link 
                  href="/insights" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white h-10 py-2 px-8"
                >
                  View All Insights
                  <HiArrowLongRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:py-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm my-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Common questions about Collaborative AI
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <HiChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section 
        id="collaboration" 
        className={`animate-section relative py-20 px-4 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-16
          ${visibleSections.collaboration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
          transition-all duration-1000 ease-out delay-300`}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 clip-circle transform -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Collaborate With Us</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join our community of researchers, practitioners, and enthusiasts exploring the frontier of Collaborative AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
              <HiAcademicCap className="w-8 h-8 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Research Partnerships</h3>
              <p className="text-blue-100 mb-4">
                Collaborate with us on cutting-edge research in Collaborative AI. We welcome academic and industry partnerships.
              </p>
              <Link 
                href="/contact#research" 
                className="text-white font-medium hover:text-blue-200 inline-flex items-center"
              >
                Learn more
                <HiArrowLongRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
              <HiDocumentText className="w-8 h-8 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Join Our Newsletter</h3>
              <p className="text-blue-100 mb-4">
                Stay updated with the latest developments, research findings, and events in the Collaborative AI space.
              </p>
              <Link 
                href="#newsletter" 
                className="text-white font-medium hover:text-blue-200 inline-flex items-center"
              >
                Subscribe
                <HiArrowLongRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors">
              <HiChatBubbleLeftRight className="w-8 h-8 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Speaking Engagements</h3>
              <p className="text-blue-100 mb-4">
                Invite Mustafa Sualp to speak about Collaborative AI at your conference, event, or organization.
              </p>
              <Link 
                href="/contact#speaking" 
                className="text-white font-medium hover:text-blue-200 inline-flex items-center"
              >
                Request speaking
                <HiArrowLongRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for the latest insights, research findings, and events in Collaborative AI
          </p>
          
          {subscriptionStatus.submitted && subscriptionStatus.success ? (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
              <p>{subscriptionStatus.message}</p>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 rounded-md border ${emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  aria-label="Email address"
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1" id="email-error">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy and will never share your information. You can unsubscribe at any time.
          </p>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore the Future of Collaboration?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with us to discuss research opportunities, partnerships, or to learn more about our work in Collaborative AI.
        </p>
        <Link 
          href="/contact" 
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md inline-flex items-center"
        >
          Get in Touch
          <HiArrowLongRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </PageContainer>
  );
}
