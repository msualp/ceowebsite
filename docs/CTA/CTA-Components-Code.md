// components/cta/Button.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105',
        secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-gray-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
        linkedin: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
        calendly: 'bg-[#00A2FF] text-white hover:bg-[#0082CC]',
        sociail: 'bg-blue-600 text-white hover:bg-blue-700',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
      },
      size: {
        sm: 'h-9 px-3 rounded-md',
        md: 'h-11 px-6 rounded-md',
        lg: 'h-12 px-8 rounded-md',
        xl: 'h-14 px-10 text-base rounded-md',
      },
      withIcon: {
        true: 'gap-2',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      withIcon: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
  external?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  className,
  variant,
  size,
  withIcon,
  fullWidth,
  isLoading = false,
  href,
  external = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) => {
  const Comp = href ? (external ? 'a' : Link) : 'button';
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const iconOnly = !children && (leftIcon || rightIcon);
  
  const content = (
    <>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  // For a button with just an icon, we want it to be square
  const iconOnlyClass = iconOnly ? 'aspect-square p-0 flex items-center justify-center' : '';
  
  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          withIcon: Boolean(leftIcon || rightIcon || isLoading),
          fullWidth,
        }),
        iconOnlyClass,
        className
      )}
      href={href || ''}
      {...externalProps}
      {...props}
    >
      {content}
    </Comp>
  );
};

export { Button, buttonVariants };

// components/cta/CTAGroup.tsx
import { ReactNode } from 'react';
import { Button } from './Button';
import { CalendarDays, Mail, Linkedin, ArrowRight } from 'lucide-react';

interface CTAGroupProps {
  className?: string;
  variant?: 'hero' | 'inline' | 'footer' | 'compact';
  primaryCTA?: 'earlyAccess' | 'calendly' | 'linkedin' | 'email' | 'custom';
  primaryLabel?: string;
  primaryHref?: string;
  primaryIcon?: ReactNode;
  secondaryCTA?: 'earlyAccess' | 'calendly' | 'linkedin' | 'email' | 'custom' | 'none';
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryIcon?: ReactNode;
  showAll?: boolean;
  direction?: 'row' | 'column';
}

export function CTAGroup({
  className = '',
  variant = 'inline',
  primaryCTA = 'earlyAccess',
  primaryLabel,
  primaryHref,
  primaryIcon,
  secondaryCTA = 'calendly',
  secondaryLabel,
  secondaryHref,
  secondaryIcon,
  showAll = false,
  direction = 'row',
}: CTAGroupProps) {
  // Define CTA configurations
  const ctaConfigs = {
    earlyAccess: {
      label: 'Join Early Access',
      href: '/early-access',
      icon: <ArrowRight className="w-4 h-4" />,
      variant: 'primary' as const,
    },
    calendly: {
      label: 'Schedule a Meeting',
      href: 'https://calendly.com/msualp',
      icon: <CalendarDays className="w-4 h-4" />,
      variant: 'calendly' as const,
      external: true,
    },
    linkedin: {
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/sualp/',
      icon: <Linkedin className="w-4 h-4" />,
      variant: 'linkedin' as const,
      external: true,
    },
    email: {
      label: 'Email Me',
      href: 'mailto:msualp@sociail.com',
      icon: <Mail className="w-4 h-4" />,
      variant: 'outline' as const,
      external: true,
    },
    custom: {
      label: '',
      href: '',
      icon: null,
      variant: 'primary' as const,
    },
    none: {
      label: '',
      href: '',
      icon: null,
      variant: 'primary' as const,
    },
  };

  // Set up the primary CTA
  const primary = {
    ...ctaConfigs[primaryCTA],
    label: primaryLabel || ctaConfigs[primaryCTA].label,
    href: primaryHref || ctaConfigs[primaryCTA].href,
    icon: primaryIcon || ctaConfigs[primaryCTA].icon,
  };

  // Set up the secondary CTA
  const secondary = {
    ...ctaConfigs[secondaryCTA],
    label: secondaryLabel || ctaConfigs[secondaryCTA].label,
    href: secondaryHref || ctaConfigs[secondaryCTA].href,
    icon: secondaryIcon || ctaConfigs[secondaryCTA].icon,
  };

  // Define variant-specific classes and sizes
  const variantStyles = {
    hero: {
      container: 'gap-4',
      primarySize: 'xl' as const,
      secondarySize: 'xl' as const,
      secondaryVariant: 'secondary' as const,
    },
    inline: {
      container: 'gap-3',
      primarySize: 'md' as const,
      secondarySize: 'md' as const,
      secondaryVariant: 'outline' as const,
    },
    footer: {
      container: 'gap-2',
      primarySize: 'md' as const,
      secondarySize: 'md' as const,
      secondaryVariant: ctaConfigs[secondaryCTA].variant,
    },
    compact: {
      container: 'gap-2',
      primarySize: 'sm' as const,
      secondarySize: 'sm' as const,
      secondaryVariant: 'ghost' as const,
    },
  };

  const currentStyles = variantStyles[variant];
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';

  if (showAll) {
    // Render all CTAs
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        <Button
          variant="primary"
          size={currentStyles.primarySize}
          href={ctaConfigs.earlyAccess.href}
          rightIcon={ctaConfigs.earlyAccess.icon}
        >
          {ctaConfigs.earlyAccess.label}
        </Button>
        <Button
          variant="calendly"
          size={currentStyles.primarySize}
          href={ctaConfigs.calendly.href}
          external={true}
          rightIcon={ctaConfigs.calendly.icon}
        >
          {ctaConfigs.calendly.label}
        </Button>
        <Button
          variant="linkedin"
          size={currentStyles.primarySize}
          href={ctaConfigs.linkedin.href}
          external={true}
          rightIcon={ctaConfigs.linkedin.icon}
        >
          {ctaConfigs.linkedin.label}
        </Button>
        <Button
          variant="outline"
          size={currentStyles.primarySize}
          href={ctaConfigs.email.href}
          external={true}
          rightIcon={ctaConfigs.email.icon}
        >
          {ctaConfigs.email.label}
        </Button>
      </div>
    );
  }

  // Render primary and secondary CTAs
  return (
    <div className={`flex ${directionClass} ${currentStyles.container} ${className}`}>
      {primaryCTA !== 'none' && (
        <Button
          variant={primary.variant}
          size={currentStyles.primarySize}
          href={primary.href}
          external={primary.external}
          rightIcon={primary.icon}
        >
          {primary.label}
        </Button>
      )}
      {secondaryCTA !== 'none' && (
        <Button
          variant={currentStyles.secondaryVariant}
          size={currentStyles.secondarySize}
          href={secondary.href}
          external={secondary.external}
          rightIcon={secondary.icon}
        >
          {secondary.label}
        </Button>
      )}
    </div>
  );
}

// components/cta/EarlyAccessCTA.tsx
'use client';

import { useState } from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

interface EarlyAccessCTAProps {
  className?: string;
  variant?: 'default' | 'prominent' | 'minimal';
  backgroundColor?: string;
  showCounter?: boolean;
}

export function EarlyAccessCTA({
  className = '',
  variant = 'default',
  backgroundColor = 'bg-blue-50 dark:bg-blue-900/20',
  showCounter = false,
}: EarlyAccessCTAProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const remainingSpots = 247; // This would be fetched from an API in a real implementation
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  if (variant === 'minimal') {
    return (
      <div className={`${className}`}>
        <Button 
          variant="primary" 
          href="/early-access" 
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Join Early Access
        </Button>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className={`${backgroundColor} p-8 rounded-xl shadow-md ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Join the Sociail Beta Program</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-0">
              Be among the first to experience the future of AI collaboration.
            </p>
            {showCounter && (
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {remainingSpots} spots remaining
                </span>
              </div>
            )}
          </div>
          
          {isSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg p-4 max-w-md">
              <p className="font-medium">Thanks for joining!</p>
              <p className="text-sm mt-1">We'll be in touch soon with details about early access.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                  } dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  disabled={isSubmitting}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                rightIcon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                Get Access
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${backgroundColor} p-6 rounded-lg ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">Early Access Program</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3">Be the first to experience Sociail</h3>
      
      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg p-4">
          <p className="font-medium">Thanks for joining!</p>
          <p className="text-sm mt-1">We'll be in touch soon with details about early access.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 rounded-md border ${
                emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
              } dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              disabled={isSubmitting}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
          >
            Join Now
          </Button>
        </form>
      )}
      
      {showCounter && !isSubmitted && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-green-600 dark:text-green-400">{remainingSpots} spots</span> remaining in our limited beta program
        </div>
      )}
    </div>
  );
}

// components/cta/FloatingCTA.tsx
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
      href: 'https://calendly.com/msualp',
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

// components/cta/FooterCTA.tsx
import Link from 'next/link';
import { Button } from './Button';
import { ExternalLink, ArrowRight, CalendarDays, Mail, Linkedin } from 'lucide-react';

export function FooterCTA() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Connect with Mustafa</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">
            Interested in AI collaboration, entrepreneurship, or discussing potential opportunities? Reach out through any of these channels.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="primary"
            size="md"
            href="/early-access"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Join Early Access
          </Button>
          
          <Button
            variant="outline"
            size="md"
            href="https://calendly.com/msualp"
            external={true}
            rightIcon={<CalendarDays className="w-4 h-4" />}
          >
            Schedule Meeting
          </Button>
          
          <Button
            variant="linkedin"
            size="md"
            href="https://www.linkedin.com/in/sualp/"
            external={true}
            rightIcon={<Linkedin className="w-4 h-4" />}
          >
            Connect on LinkedIn
          </Button>
          
          <Button
            variant="outline"
            size="md"
            href="mailto:msualp@sociail.com"
            external={true}
            rightIcon={<Mail className="w-4 h-4" />}
          >
            Email Me
          </Button>
        </div>
      </div>
    </div>
  );
}

// Usage Examples for different contexts:

// Example 1: Hero section
/* 
<section className="py-20 text-center">
  <h1 className="text-5xl font-bold mb-6">Mustafa Sualp</h1>
  <p className="text-xl mb-8 max-w-2xl mx-auto">
    Serial entrepreneur, AI enthusiast, and founder of Sociail
  </p>
  <CTAGroup 
    variant="hero" 
    primaryCTA="earlyAccess" 
    secondaryCTA="calendly" 
  />
</section>
*/

// Example 2: Inline in content
/*
<section className="my-12">
  <h2 className="text-2xl font-bold mb-4">Interested in AI Collaboration?</h2>
  <p className="mb-6">
    Learn how Sociail is transforming how teams work with AI.
  </p>
  <CTAGroup 
    variant="inline" 
    primaryCTA="earlyAccess" 
    secondaryLabel="Schedule a Demo" 
  />
</section>
*/

// Example 3: Early Access specific component
/*
<section className="my-16">
  <h2 className="text-3xl font-bold mb-8">Join the Revolution</h2>
  <EarlyAccessCTA 
    variant="prominent" 
    showCounter={true} 
  />
</section>
*/

// Example 4: Mobile floating action button
/*
<FloatingCTA primaryCTA="earlyAccess" />
*/

// Example 5: Footer with all options
/*
<footer className="py-12">
  <FooterCTA />
</footer>
*/