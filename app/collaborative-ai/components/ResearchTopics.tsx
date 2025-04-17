'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowLongRight, HiUserGroup, HiCpuChip, HiLightBulb, HiPuzzlePiece, HiChatBubbleLeftRight, HiAcademicCap } from 'react-icons/hi2';

// Types for our research topic cards
export type ResearchTopic = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

interface ResearchTopicsProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
}

/**
 * ResearchTopics component for displaying research areas in Collaborative AI
 */
export default function ResearchTopics({ className = '', isVisible = true }: ResearchTopicsProps) {
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

  return (
    <section 
      id="research-topics" 
      className={`relative py-20 px-4 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl my-16
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out delay-300 ${className}`}
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
  );
}
