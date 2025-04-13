'use client';

/**
 * NOTE: This component is currently incomplete and under development.
 * 
 * TODO:
 * - Fix positioning issues on mobile devices
 * - Improve arrow direction calculation
 * - Add better animation for appearance/disappearance
 * - Ensure proper accessibility for screen readers
 * - Fix z-index issues with other elements
 * - Add support for different tooltip sizes
 */

import React, {
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import './AnimationStyles.css';

interface TooltipCardProps {
  anchorRef: React.RefObject<HTMLElement | null>; // The target element (card)
  title: string;
  description: string;
  example: string;
  stats: string;
  colorClass: {
    text: string;
    border: string;
    bg: string;
  };
  showArrow?: boolean;
  className?: string;
  zIndex?: string;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export const TooltipCard = forwardRef<HTMLDivElement, TooltipCardProps>(
  (
    {
      anchorRef,
      title,
      description,
      example,
      stats,
      colorClass,
      showArrow = true,
      className = '',
      zIndex = 'z-[9999]',
      autoDismiss = false,
      dismissDelay = 6000,
    },
    ref
  ) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
      position: 'fixed',
      top: 0,
      left: 0,
      opacity: 0,
      pointerEvents: 'none',
    });

    // Auto-dismiss tooltip after delay if enabled
    useEffect(() => {
      if (autoDismiss) {
        const timer = setTimeout(() => {
          setStyle(prev => ({ ...prev, opacity: 0, pointerEvents: 'none' }));
        }, dismissDelay);
        
        return () => clearTimeout(timer);
      }
    }, [autoDismiss, dismissDelay]);
    
    useLayoutEffect(() => {
      const anchorEl = anchorRef.current;
      const tooltipEl = tooltipRef.current;

      if (!anchorEl || !tooltipEl) return;

      const anchorRect = anchorEl.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();

      const spaceAbove = anchorRect.top;
      const spaceBelow = window.innerHeight - anchorRect.bottom;

      const shouldShowAbove = spaceAbove > tooltipRect.height + 16;
      
      // Handle mobile screens
      const isMobile = window.innerWidth < 480;
      
      let top, left, width;
      
      if (isMobile) {
        // On mobile, position below the anchor with side padding
        top = anchorRect.bottom + 12;
        left = 16; // side padding
        width = window.innerWidth - 32;
      } else {
        // Normal positioning
        top = shouldShowAbove
          ? anchorRect.top - tooltipRect.height - 12
          : anchorRect.bottom + 12;
        
        left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
        width = undefined;
      }

      setStyle({
        position: 'fixed',
        top: Math.max(8, top),
        left: isMobile ? left : Math.min(
          Math.max(8, left),
          window.innerWidth - tooltipRect.width - 8
        ),
        width,
        opacity: 1,
        pointerEvents: 'auto',
      });
    }, [anchorRef.current]);

    const content = (
      <div
        ref={(node) => {
          tooltipRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref && node) (ref as React.MutableRefObject<HTMLDivElement>).current = node;
        }}
        role="tooltip"
        aria-live="polite"
        className={`
          ${zIndex} ${className}
          bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs w-64
          border ${colorClass.border} 
          transition-all duration-200 ease-out
          opacity-0 scale-95 animate-fade-in
        `}
        style={style}
      >
        {showArrow && anchorRef.current && (
          <div 
            className="absolute w-4 h-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            style={{
              top: typeof style.top === 'number' && anchorRef.current && style.top > anchorRef.current.getBoundingClientRect().bottom ? '-8px' : undefined,
              bottom: typeof style.top === 'number' && anchorRef.current && style.top < anchorRef.current.getBoundingClientRect().top ? '-8px' : undefined,
              left: '50%',
              transform: `translateX(-50%) ${typeof style.top === 'number' && anchorRef.current && style.top > anchorRef.current.getBoundingClientRect().bottom ? 'rotate(45deg)' : 'rotate(-135deg)'}`,
              borderRight: typeof style.top === 'number' && anchorRef.current && style.top > anchorRef.current.getBoundingClientRect().bottom ? 'none' : undefined,
              borderBottom: typeof style.top === 'number' && anchorRef.current && style.top > anchorRef.current.getBoundingClientRect().bottom ? 'none' : undefined,
              borderLeft: typeof style.top === 'number' && anchorRef.current && style.top < anchorRef.current.getBoundingClientRect().top ? 'none' : undefined,
              borderTop: typeof style.top === 'number' && anchorRef.current && style.top < anchorRef.current.getBoundingClientRect().top ? 'none' : undefined,
            }} 
          />
        )}
        <h4 className={`font-bold mb-2 ${colorClass.text}`}>{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>
            <strong>Example:</strong> {example}
          </p>
          <p>
            <strong>Stats:</strong> {stats}
          </p>
        </div>
      </div>
    );

    return ReactDOM.createPortal(content, document.body);
  }
);

TooltipCard.displayName = 'TooltipCard';
