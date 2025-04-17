'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import {
  HeroSection,
  DefinitionSection,
  VisionSection,
  ResearchTopics,
  ThoughtLeadership,
  FaqSection,
  CollaborationSection,
  Newsletter,
  CallToAction
} from './components';

export default function CollaborativeAIPage() {
  // State for animation on scroll
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    definition: false,
    vision: false,
    research: false,
    insights: false,
    collaboration: false
  });

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

  return (
    <PageContainer title="Collaborative AI">
      {/* Hero Section */}
      <div className="animate-section" id="hero">
        <HeroSection isVisible={visibleSections.hero} />
      </div>

      {/* Definition Section */}
      <div className="animate-section" id="definition">
        <DefinitionSection isVisible={visibleSections.definition} />
      </div>

      {/* Vision Section */}
      <div className="animate-section" id="vision">
        <VisionSection isVisible={visibleSections.vision} />
      </div>

      {/* Research Topics Section */}
      <div className="animate-section" id="research">
        <ResearchTopics isVisible={visibleSections.research} />
      </div>

      {/* Thought Leadership Section */}
      <div className="animate-section" id="insights">
        <ThoughtLeadership isVisible={visibleSections.insights} />
      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* Collaboration Section */}
      <div className="animate-section" id="collaboration">
        <CollaborationSection isVisible={visibleSections.collaboration} />
      </div>

      {/* Newsletter Section */}
      <Newsletter />
      
      {/* Call to Action */}
      <CallToAction />
    </PageContainer>
  );
}
