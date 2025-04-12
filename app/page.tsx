'use client';

import { useEffect } from 'react';
import { initAllAnimations } from '@/lib/animation-utils';

// Import all the component sections
import HeroSection from '@/components/home/HeroSection';
import UseCasesSection from '@/components/home/UseCasesSection';
import MissionCapsule from '@/components/home/MissionCapsule';
import WorkingOnSection from '@/components/home/WorkingOnSection';
import DocumentarySection from '@/components/home/DocumentarySection';
import InsightsSection from '@/components/home/InsightsSection';
import TeamTributeSection from '@/components/home/TeamTributeSection';

export default function HomePage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Mission Capsule */}
      <section className="bg-gray dark:bg-gray py-12">
        <MissionCapsule />
      </section>
      
      {/* Use Cases Section */}
      <UseCasesSection />

      {/* What I'm Working On Section */}
      <WorkingOnSection />
      
      {/* AI Startup Documentary Section */}
      <DocumentarySection />
      
      {/* Latest Insights Section */}
      <InsightsSection />

      {/* Team Tribute Section */}
      <TeamTributeSection />
    </div>
  );
}
