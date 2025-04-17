'use client';

import React from 'react';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import LazyNewsletterForm from '@/components/lazy/LazyNewsletterForm';

interface NewsletterProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Newsletter component for the insights page
 */
export default function Newsletter({ className = '' }: NewsletterProps) {
  return (
    <Section background="light" spacing="md" className={`mt-12 rounded-xl mac-glass border border-blue-50 dark:border-blue-900/20 relative overflow-hidden ${className}`}>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-2xl rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 blur-2xl rounded-full"></div>
      
      <SectionTitle 
        title="Stay in the Loop" 
        subtitle="Join our newsletter to receive the latest insights on AI, leadership, and productivity."
        className="mb-6"
      />
      
      <div className="max-w-md mx-auto relative">
        <LazyNewsletterForm />
      </div>
    </Section>
  );
}
