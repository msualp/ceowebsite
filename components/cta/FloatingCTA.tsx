'use client';

import { useState } from 'react';
import { Button } from './Button';
import { X, Plus, CalendarDays, Mail, Linkedin, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface FloatingCTAProps {
  primaryCTA?: 'earlyAccess' | 'calendly' | 'linkedin' | 'email';
}

export function FloatingCTA({ primaryCTA = 'earlyAccess' }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  const ctaConfigs = {
    earlyAccess: {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Join Early Access',
      href: '/early-access',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    },
    calendly: {
      icon: <CalendarDays className="w-5 h-5" />,
      label: 'Schedule Meeting',
      href: 'https://calendly.com/msualp-main',
      bgColor: 'bg-[#00A2FF]',
    },
    linkedin: {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/sualp/',
      bgColor: 'bg-[#0A66C2]',
    },
    email: {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Me',
      href: 'mailto:msualp@sociail.com',
      bgColor: 'bg-gray-700 dark:bg-gray-600',
    },
  };
  
  const primaryConfig = ctaConfigs[primaryCTA];
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-16 right-0 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {Object.entries(ctaConfigs)
              .filter(([key]) => key !== primaryCTA)
              .map(([key, config]) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 justify-end"
                >
                  <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1 px-3 rounded-full shadow-md">
                    {config.label}
                  </span>
                  <a 
                    href={config.href}
                    target={key !== 'earlyAccess' ? '_blank' : undefined}
                    rel={key !== 'earlyAccess' ? 'noopener noreferrer' : undefined}
                    className={`${config.bgColor} text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center`}
                  >
                    {config.icon}
                  </a>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center gap-2 justify-end">
        {isOpen && (
          <motion.span 
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1 px-3 rounded-full shadow-md"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {primaryConfig.label}
          </motion.span>
        )}
        <button
          onClick={toggleOpen}
          className={`${isOpen ? 'bg-gray-700' : primaryConfig.bgColor} text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center z-10`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-5 h-5" /> : primaryConfig.icon}
        </button>
      </div>
    </div>
  );
}
