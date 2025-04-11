'use client';

import { ReactNode } from 'react';

interface SocialLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
  username: string;
  external?: boolean;
  className?: string;
}

export default function SocialLink({
  icon,
  label,
  href,
  username,
  external = true,
  className = ''
}: SocialLinkProps) {
  return (
    <div className={`flex items-center fade-in-scroll ${className}`}>
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition icon-hover">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <a 
          href={href} 
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:underline icon-hover"
        >
          {username}
        </a>
      </div>
    </div>
  );
}
