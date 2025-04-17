'use client';

import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

export type FaqItem = {
  question: string;
  answer: string;
};

interface FaqSectionProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Custom FAQ items (optional) */
  customFaqs?: FaqItem[];
}

/**
 * FaqSection component for displaying frequently asked questions
 */
export default function FaqSection({ className = '', customFaqs }: FaqSectionProps) {
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Function to toggle FAQ items
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Default FAQ data if none provided
  const defaultFaqs: FaqItem[] = [
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

  // Use custom FAQs if provided, otherwise use default
  const faqs = customFaqs || defaultFaqs;

  return (
    <section className={`py-20 px-4 md:py-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm my-16 ${className}`}>
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
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <HiChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <HiChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <div 
                id={`faq-answer-${index}`}
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
  );
}
