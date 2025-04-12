'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import LazyContactForm from '@/components/lazy/LazyContactForm';
import SocialLink from '@/components/SocialLink';

export default function ContactPage() {
  // Initialize animations
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  return (
    <PageContainer title="Contact">
      <div className="relative mb-8 max-w-4xl mx-auto fade-in-scroll">
        <div className="img-with-caption relative">
          <Image
            src="/images/sociail-office.png"
            alt="Sociail Office"
            width={1200}
            height={600}
            className="w-full rounded-xl shadow-md"
          />
          <div className="caption-reveal">
            🏖️ Welcome to Our Global Headquarters and the Sociail "Beach Office"!
          </div>
        </div>
      </div>
      
      <SectionTitle 
        title="Let's Connect" 
        centered={false}
        className="mb-4"
      />
      
      <p className="text-lg mb-8 fade-in-scroll">
        I'm always open to connecting with fellow entrepreneurs, technologists, and anyone passionate 
        about building the future. Feel free to reach out using the form below or connect with me on social media.
      </p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <LazyContactForm />
        
        <div className="fade-in-scroll">
          <h2 className="text-xl font-semibold mb-4">Find Me Online</h2>
          <div className="space-y-4 stagger-fade-in">
            <SocialLink
              icon={<FaLinkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/sualp/"
              username="linkedin.com/in/sualp"
            />
            
            <SocialLink
              icon={<FaGithub className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              label="GitHub"
              href="https://github.com/msualp"
              username="github.com/msualp"
            />
            
            <SocialLink
              icon={<FaXTwitter className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              label="X (formerly Twitter)"
              href="https://x.com/msualp_sociail"
              username="@msualp_sociail"
            />
            
            <SocialLink
              icon={<MdEmail className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              label="Email"
              href="mailto:mustafa@sualp.com"
              username="mustafa@sualp.com"
              external={false}
            />

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Office</h2>
              <SocialLink
                icon={<MdLocationOn className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                label="Sociail, Inc."
                href="https://www.google.com/maps/place/511+N+Boardwalk,+Rehoboth+Beach,+DE+19971"
                username="511 N Boardwalk, Rehoboth Beach, DE 19971"
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
