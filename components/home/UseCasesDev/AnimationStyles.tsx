'use client';

import React from 'react';

const AnimationStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Base animation for the marquee */
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes marquee-reverse {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse-subtle {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
      }
      
      @keyframes ping-slow {
        0% { transform: scale(0.8); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.4; }
        100% { transform: scale(0.8); opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      
      .animate-marquee-reverse {
        animation: marquee-reverse 30s linear infinite;
      }
      
      .animate-pulse-subtle {
        animation: pulse-subtle 2s ease-in-out infinite;
      }
      
      .animate-ping-slow {
        animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      
      /* For background gradient animation */
      .bg-size-200 {
        background-size: 200% 200%;
      }
      
      .bg-pos-0 {
        background-position: 0% 0%;
      }
      
      .bg-pos-100 {
        background-position: 100% 100%;
      }
      
      /* Improve scrolling on mobile */
      .use-cases-row {
        -webkit-overflow-scrolling: touch;
      }
      
      @media (max-width: 768px) {
        .use-cases-row {
          scroll-snap-type: x mandatory;
        }
        
        .use-case-pill {
          scroll-snap-align: start;
        }
      }
    `}</style>
  );
};

export default AnimationStyles;
