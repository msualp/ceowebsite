'use client';

import Image from 'next/image';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';

const TeamTributeSection = () => {
  return (
    <Section background="light" spacing="md">
      <div className="section-glass">
        <SectionTitle title="My Team is My Superpower" />
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center space-y-4">
          Pictured here with the AEFIS team just days before the COVID-19 lockdown. 
          A difficult, transformative time — but also one of our most inspiring chapters. 
          I am forever grateful to those who helped shape that journey.
        </p>
        <div className="img-with-caption relative rounded-xl overflow-hidden shadow-lg border border-white/20">
          <Image
            src="/images/Mustafa-Sualp-with-AEFIS-Team.png"
            alt="AEFIS team gathered for a group photo in March 2020, just before the COVID-19 pandemic"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="caption-reveal">
            AEFIS team, March 2020 — just days before the world changed.
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TeamTributeSection;
