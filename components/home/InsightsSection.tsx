'use client';

import { HiArrowLongRight } from 'react-icons/hi2';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import InsightCard from '@/components/InsightCard';
import Button from '@/components/Button';

const InsightsSection = () => {
  return (
    <Section background="white" spacing="md">
      <SectionTitle 
        title="Latest Insights" 
        subtitle="Thoughts and perspectives on AI, leadership, and innovation"
      />
      
      <div className="mac-glass p-8 rounded-xl shadow-xl mb-8">
        <div className="grid md:grid-cols-2 gap-8 stagger-fade-in">
          <InsightCard
            title="Precision and Alignment: Great Lesson from Mentor"
            date="April 9, 2025"
            excerpt="How a mentor's focus on precise language transformed my approach to leadership and team alignment."
            slug="precision-and-alignment"
          />
          
          <InsightCard
            title="Lessons from Bootstrapping AEFIS"
            date="April 9, 2025"
            excerpt="My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit."
            slug="lessons-from-bootstrapping"
          />
        </div>
      </div>
      
      <div className="text-center fade-in-scroll">
        <Button 
          href="/insights" 
          variant="outline"
          icon={<HiArrowLongRight />}
        >
          View All Insights
        </Button>
      </div>
    </Section>
  );
};

export default InsightsSection;
