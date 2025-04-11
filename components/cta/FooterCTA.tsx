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
            href="https://calendly.com/msualp-main"
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
