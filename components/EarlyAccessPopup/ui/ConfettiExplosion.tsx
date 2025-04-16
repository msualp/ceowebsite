'use client';

import React, { useEffect, useState } from 'react';
import { ConfettiExplosionProps } from '../types';
import { CONFETTI_COLORS } from '../constants';

/**
 * Confetti explosion animation component
 */
const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({ active }) => {
  const [confettiCount, setConfettiCount] = useState(0);

  // Calculate optimal number of confetti pieces based on screen width
  useEffect(() => {
    if (active && typeof window !== 'undefined') {
      setConfettiCount(Math.min(Math.floor(window.innerWidth / 8), 150));
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const size = Math.random() * 12 + 6; // Slightly larger confetti
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 4 + 2; // Longer animation
        const delay = Math.random() * 0.7; // More varied delays
        const isCircle = Math.random() > 0.7; // 30% circles, 70% squares
        const rotation = Math.random() * 360; // Random initial rotation
        
        return (
          <div
            key={i}
            className="absolute opacity-80" // Slightly more opaque
            style={{
              width: size + 'px',
              height: size + 'px',
              backgroundColor: color,
              borderRadius: isCircle ? '50%' : '0',
              top: '-20px',
              left: left + '%',
              transform: `rotate(${rotation}deg)`,
              animation: `confetti ${animationDuration}s ease-in-out ${delay}s forwards`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)' // Subtle shadow for depth
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(720deg); // More rotation
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfettiExplosion;
