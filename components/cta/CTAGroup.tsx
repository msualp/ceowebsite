import { ReactNode } from 'react';
import { Button } from './Button';
import { CalendarDays, Mail, Linkedin, ArrowRight } from 'lucide-react';

type CTAType = 'earlyAccess' | 'calendly' | 'linkedin' | 'email' | 'custom' | 'none';

interface CTAConfig {
  label: string;
  href: string;
  icon: ReactNode;
  variant: 'primary' | 'secondary' | 'outline' | 'linkedin' | 'calendly' | 'sociail' | 'ghost';
  external?: boolean;
}

interface CTAGroupProps {
  className?: string;
  variant?: 'hero' | 'inline' | 'footer' | 'compact';
  primaryCTA?: CTAType;
  primaryLabel?: string;
  primaryHref?: string;
  primaryIcon?: ReactNode;
  secondaryCTA?: CTAType;
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
  const ctaConfigs: Record<CTAType, CTAConfig> = {
    earlyAccess: {
      label: 'Join Early Access',
      href: '/early-access',
      icon: <ArrowRight className="w-4 h-4" />,
      variant: 'primary',
    },
    calendly: {
      label: 'Schedule a Meeting',
      href: 'https://calendly.com/msualp',
      icon: <CalendarDays className="w-4 h-4" />,
      variant: 'calendly',
      external: true,
    },
    linkedin: {
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/sualp/',
      icon: <Linkedin className="w-4 h-4" />,
      variant: 'linkedin',
      external: true,
    },
    email: {
      label: 'Email Me',
      href: 'mailto:msualp@sociail.com',
      icon: <Mail className="w-4 h-4" />,
      variant: 'outline',
      external: true,
    },
    custom: {
      label: '',
      href: '',
      icon: null,
      variant: 'primary',
      external: false,
    },
    none: {
      label: '',
      href: '',
      icon: null,
      variant: 'primary',
      external: false,
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
          external={primary.external || false}
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
          external={secondary.external || false}
          rightIcon={secondary.icon}
        >
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
