'use client';

import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';

interface SocialSharingProps {
  title: string;
  slug: string;
}

export default function SocialSharing({ title, slug }: SocialSharingProps) {
  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 className="text-lg font-semibold mb-4">Share this article</h3>
      <div className="flex gap-2">
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0072b1] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#3b5998] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(`https://mustafasualp.com/insights/${slug}`);
            alert('Link copied to clipboard!');
          }}
          className="bg-gray-600 dark:bg-gray-700 text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Copy link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
