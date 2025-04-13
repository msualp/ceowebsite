'use client';

import React from 'react';
import { UseCase, SectionName } from './types';

// All use cases with unique IDs, tooltips, and related items
export const allUseCases: UseCase[] = [
  // Personal use cases
  {
    id: 'personal-0',
    text: "Helping students co-write their future with AI",
    category: 'personal',
    tooltip: {
      title: "AI-Enhanced Learning",
      description: "AI writing assistants help students improve their writing skills and develop ideas more effectively.",
      example: "A student using AI to brainstorm thesis topics and refine arguments for their capstone project.",
      stats: "76% of students report improved grades when using AI writing assistants."
    },
    relatedIds: ['teams-3', 'business-0']
  },
  {
    id: 'personal-1',
    text: "Enabling solopreneurs to scale expertise on demand",
    category: 'personal',
    tooltip: {
      title: "AI Business Scaling",
      description: "Solo entrepreneurs can multiply their productivity by automating routine tasks and extending capabilities.",
      example: "A consultant using AI to handle research, drafting, and client communications simultaneously.",
      stats: "Solopreneurs using AI report handling 3x more clients without hiring additional staff."
    },
    relatedIds: ['business-3', 'teams-1']
  },
  {
    id: 'personal-2',
    text: "Enhancing creators' workflows with collaborative agents",
    category: 'personal',
    tooltip: {
      title: "Creative AI Collaboration",
      description: "Content creators partner with AI to enhance ideation, editing, and production processes.",
      example: "A YouTuber using AI to script, edit transcripts, and generate thumbnail ideas simultaneously.",
      stats: "Creators using AI report 40% faster content production times."
    },
    relatedIds: ['personal-4', 'teams-4']
  },
  {
    id: 'personal-3',
    text: "Supporting researchers with AI-enhanced literature reviews",
    category: 'personal',
    tooltip: {
      title: "AI Research Assistance",
      description: "Researchers use AI to summarize papers, identify patterns across literature, and suggest new connections.",
      example: "A PhD candidate using AI to analyze thousands of papers to find research gaps.",
      stats: "Research time can be reduced by up to 60% for comprehensive literature reviews."
    },
    relatedIds: ['business-1', 'personal-0']
  },
  {
    id: 'personal-4',
    text: "Helping writers overcome creative blocks with AI collaboration",
    category: 'personal',
    tooltip: {
      title: "Creative Writing Partnership",
      description: "Writers collaborate with AI to brainstorm ideas, develop characters, and overcome writer's block.",
      example: "A novelist using AI to explore alternative plot directions when stuck on a chapter.",
      stats: "87% of writers report AI helps them overcome creative blocks faster."
    },
    relatedIds: ['personal-2', 'teams-0']
  },
  
  // Teams use cases
  {
    id: 'teams-0',
    text: "Accelerating team decisions with intelligent copilots",
    category: 'teams',
    tooltip: {
      title: "Decision Intelligence",
      description: "Teams use AI copilots to synthesize information, present options, and facilitate more effective decisions.",
      example: "A product team using AI to rapidly evaluate feature prioritization based on customer feedback data.",
      stats: "Decision-making cycles reduced by 35% when using AI decision support tools."
    },
    relatedIds: ['business-2', 'teams-4']
  },
  {
    id: 'teams-1',
    text: "Turning org-wide knowledge into instant insight",
    category: 'teams',
    tooltip: {
      title: "Knowledge Intelligence",
      description: "Teams leverage AI to access, connect, and apply organizational knowledge that would otherwise be siloed.",
      example: "A new employee using AI to quickly learn company procedures and historical context.",
      stats: "Organizations report 45% faster onboarding and 30% reduction in repeated work."
    },
    relatedIds: ['business-1', 'personal-1']
  },
  {
    id: 'teams-2',
    text: "Aligning product, sales, and support with shared AI memory",
    category: 'teams',
    tooltip: {
      title: "Organizational Alignment",
      description: "Different departments use shared AI memory to maintain consistent messaging and customer experiences.",
      example: "A customer receiving identical answers from sales, support, and product teams due to AI knowledge sharing.",
      stats: "30% reduction in customer confusion due to misalignment between teams."
    },
    relatedIds: ['teams-3', 'business-3']
  },
  {
    id: 'teams-3',
    text: "Facilitating cross-functional collaboration with context-aware AI",
    category: 'teams',
    tooltip: {
      title: "Collaborative Intelligence",
      description: "AI helps bridge communication gaps between teams with different expertise and vocabulary.",
      example: "Engineers and marketers using AI to translate technical specifications into customer benefits.",
      stats: "Teams report 40% less miscommunication when using collaborative AI tools."
    },
    relatedIds: ['teams-2', 'personal-0']
  },
  {
    id: 'teams-4',
    text: "Streamlining project management with collaborative intelligence",
    category: 'teams',
    tooltip: {
      title: "AI Project Management",
      description: "Project teams use AI to track progress, predict bottlenecks, and suggest resource allocation adjustments.",
      example: "A Scrum Master using AI to analyze sprint velocity and suggest process improvements.",
      stats: "Projects using AI project management tools report 25% fewer missed deadlines."
    },
    relatedIds: ['teams-0', 'personal-2']
  },
  
  // Business use cases
  {
    id: 'business-0',
    text: "Helping educators scale meaningful feedback at scale",
    category: 'business',
    tooltip: {
      title: "Educational Scaling",
      description: "Educational institutions use AI to provide personalized feedback to large student populations.",
      example: "A professor using AI to provide detailed feedback on 200+ student essays overnight.",
      stats: "Students receive 3x more feedback with AI-assisted grading."
    },
    relatedIds: ['personal-0', 'business-1']
  },
  {
    id: 'business-1',
    text: "Empowering advisors with context-rich student support",
    category: 'business',
    tooltip: {
      title: "AI-Enhanced Advising",
      description: "Academic advisors use AI to keep track of each student's history and provide more personalized guidance.",
      example: "An advisor using AI to instantly recall a student's full academic history during a guidance session.",
      stats: "Advisors can serve 40% more students while maintaining or improving satisfaction scores."
    },
    relatedIds: ['business-0', 'personal-3']
  },
  {
    id: 'business-2',
    text: "Enabling executives to strategize with real-time intelligence",
    category: 'business',
    tooltip: {
      title: "Executive Intelligence",
      description: "C-suite leaders use AI to synthesize market data, competitive intelligence, and internal metrics.",
      example: "A CEO using AI to simulate different market entry strategies based on current data.",
      stats: "Companies using AI for strategic planning report 28% more accurate forecasting."
    },
    relatedIds: ['teams-0', 'business-4']
  },
  {
    id: 'business-3',
    text: "Transforming customer service with AI-human collaboration",
    category: 'business',
    tooltip: {
      title: "Augmented Customer Service",
      description: "Service representatives partner with AI to provide faster, more accurate, and more consistent support.",
      example: "A support agent handling complex cases while AI handles routine inquiries and provides real-time information.",
      stats: "Hybrid AI-human customer service teams resolve issues 50% faster with higher satisfaction scores."
    },
    relatedIds: ['business-4', 'personal-1']
  },
  {
    id: 'business-4',
    text: "Revolutionizing healthcare with collaborative diagnostics",
    category: 'business',
    tooltip: {
      title: "AI Medical Partnership",
      description: "Healthcare professionals work with AI to improve diagnostic accuracy and treatment planning.",
      example: "A radiologist using AI to highlight subtle patterns in medical imaging that might otherwise be missed.",
      stats: "Diagnostic accuracy improves by up to 37% when clinicians partner with AI systems."
    },
    relatedIds: ['business-3', 'business-2']
  }
];

// Icons for categories
export const categoryIcons: Record<SectionName, React.ReactNode> = {
  personal: (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 21C3 18.2386 7.02944 16 12 16C16.9706 16 21 18.2386 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  teams: (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20H7M17 20C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4M17 20V6C17 4.89543 16.1046 4 15 4H7M7 20C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8Z" fill="currentColor"/>
      <path d="M15 12C15 12.5523 14.5523 13 14 13C13.4477 13 13 12.5523 13 12C13 11.4477 13.4477 11 14 11C14.5523 11 15 11.4477 15 12Z" fill="currentColor"/>
      <path d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z" fill="currentColor"/>
      <path d="M11 12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11C10.5523 11 11 11.4477 11 12Z" fill="currentColor"/>
      <path d="M11 16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16C9 15.4477 9.44772 15 10 15C10.5523 15 11 15.4477 11 16Z" fill="currentColor"/>
    </svg>
  ),
  business: (
    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Filter use cases by category
export const getUseCasesByCategory = (category: SectionName): UseCase[] => {
  return allUseCases.filter(useCase => useCase.category === category);
};
