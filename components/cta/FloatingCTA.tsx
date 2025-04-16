 'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { particleTransformTemplate } from '../../utils/animations';
import { X, CalendarDays, Mail, Linkedin, Sparkles, ArrowRight, AlertTriangle, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimation, Variants } from 'framer-motion';

interface FloatingCTAProps {
primaryCTA?: 'earlyAccess' | 'calendly' | 'linkedin' | 'email';
}

// Interface for storing interaction state
interface InteractionState {
lastClicked?: string;
hasSeenEarlyAccess: boolean;
visits: Record<string, number>;
menuState: 'open' | 'closed';
}

// Define content for each sidebar panel
interface SidePanelContent {
calendly: {
  title: 'Schedule a Meeting';
  content: React.ReactNode;
};
earlyAccess: {
  title: 'Join Early Access';
  content: React.ReactNode;
};
survey: {
  title: 'Quick Survey';
  content: React.ReactNode;
};
}

export function FloatingCTA({ primaryCTA = 'earlyAccess' }: FloatingCTAProps) {
const [isOpen, setIsOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [interactionState, setInteractionState] = useState<InteractionState>({
  lastClicked: undefined,
  hasSeenEarlyAccess: false,
  visits: {},
  menuState: 'closed'
});
const [scrollY, setScrollY] = useState(0);
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
type PanelKey = 'earlyAccess' | 'calendly' | null;
const [activePanel, setActivePanel] = useState<PanelKey>(null);
const containerRef = useRef<HTMLDivElement>(null);
const menuRef = useRef<HTMLDivElement>(null);
const focusableElementsRef = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
const currentFocusIndex = useRef<number>(-1);
const particleControls = useAnimation();
const sidePanelRef = useRef<HTMLDivElement>(null);

// Add Calendly script to head when panel is opened
useEffect(() => {
  if (activePanel === 'calendly') {
    // Check if Calendly script is already loaded
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Initialize Calendly if the global object exists
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/msualp-main/30min',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }
}, [activePanel]);

// Function to close sidepanel and return to menu
const closeSidePanel = () => {
  setActivePanel(null);
};

// Load interaction state from localStorage on mount
useEffect(() => {
  setMounted(true);
  
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  setPrefersReducedMotion(mediaQuery.matches);
  
  const handleReducedMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);
  mediaQuery.addEventListener('change', handleReducedMotionChange);
  
  // Load interaction state from localStorage
  try {
    const savedState = localStorage.getItem('floatingCTA-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setInteractionState(parsedState);
      
      // Restore menu open/closed state
      if (parsedState.menuState === 'open') {
        setIsOpen(true);
      }
    }
  } catch (err) {
    console.error('Error loading interaction state:', err);
  }
  
  return () => {
    mediaQuery.removeEventListener('change', handleReducedMotionChange);
  };
}, []);

// Track scroll position for variable glassmorphism
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Handle click outside to close only when panel is not active
useEffect(() => {
  if (activePanel) return; // Don't close menu when panel is active
  
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isOpen && containerRef.current && !containerRef.current.contains(target)) {
      setIsOpen(false);
      
      // Update menu state
      setInteractionState(prev => ({
        ...prev,
        menuState: 'closed'
      }));
    }
  };
  
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, [isOpen, activePanel]);

// Determine optimal position based on viewport
useEffect(() => {
  const determinePosition = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check if menu would overflow right edge
    const isRightOverflow = rect.right + 220 > viewportWidth;
    // Check if menu would overflow top
    const isBottomOverflow = rect.bottom - 300 < 0;
    
    if (isRightOverflow && isBottomOverflow) {
      setPosition('top-left');
    } else if (isRightOverflow) {
      setPosition('bottom-left');
    } else if (isBottomOverflow) {
      setPosition('top-right');
    } else {
      setPosition('bottom-right');
    }
  };
  
  determinePosition();
  window.addEventListener('resize', determinePosition);
  return () => window.removeEventListener('resize', determinePosition);
}, [isOpen]);

// Add an effect to close side panel and go back to menu on Escape key
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (activePanel) {
        e.preventDefault();
        setActivePanel(null);
      } else if (isOpen) {
        setIsOpen(false);
        // Update menu state in interaction state
        setInteractionState(prev => ({
          ...prev,
          menuState: 'closed'
        }));
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, activePanel]);

// Keyboard navigation
useEffect(() => {
  if (!isOpen || activePanel) return;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle arrow keys for navigation
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      
      // Collect focusable elements
      if (menuRef.current) {
        const focusableElements = Array.from(
          menuRef.current.querySelectorAll('a, button')
        ) as (HTMLAnchorElement | HTMLButtonElement)[];
        
        focusableElementsRef.current = focusableElements;
        
        // Determine direction
        const direction = e.key === 'ArrowUp' ? -1 : 1;
        
        // Find current focus index
        const currentFocusEl = document.activeElement;
        currentFocusIndex.current = focusableElements.findIndex(el => el === currentFocusEl);
        
        // Calculate new index
        let newIndex = currentFocusIndex.current + direction;
        if (newIndex < 0) newIndex = focusableElements.length - 1;
        if (newIndex >= focusableElements.length) newIndex = 0;
        
        // Focus the new element
        focusableElements[newIndex]?.focus();
        currentFocusIndex.current = newIndex;
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, activePanel]);

// Save interaction state to localStorage when it changes
useEffect(() => {
  if (!mounted) return;
  
  try {
    localStorage.setItem('floatingCTA-state', JSON.stringify({
      ...interactionState,
      // Make sure panel state isn't saved to localStorage to avoid reopening panels on page refresh
      activePanel: null
    }));
  } catch (err) {
    console.error('Error saving interaction state:', err);
  }
}, [interactionState, mounted]);

// Trigger particle animation when menu opens
useEffect(() => {
  if (isOpen && !prefersReducedMotion) {
    particleControls.start('animate');
  } else {
    particleControls.start('initial');
  }
}, [isOpen, particleControls, prefersReducedMotion]);

// React to sidepanel open/close
useEffect(() => {
  // When sidepanel opens, we hide the menu but keep track of its state
  if (activePanel) {
    // We just store the current state but don't actually close the menu
    // This ensures the menu stays "open" in localStorage but visually hidden
  } else {
    // When sidepanel closes, restore the menu if it was open before
  }
}, [activePanel]);

// Function to persist menu state across page navigations
useEffect(() => {
  // Page visibility change can be used to detect navigating back to the page
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Reload state from localStorage when returning to the page
      try {
        const savedState = localStorage.getItem('floatingCTA-state');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Only update if we're returning to the page and menu should be open
          if (parsedState.menuState === 'open') {
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error('Error loading menu state:', err);
      }
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Also handle page reload/navigation events
  const saveStateBeforeUnload = () => {
    // Ensure current state is saved before navigation
    try {
      localStorage.setItem('floatingCTA-state', JSON.stringify(interactionState));
    } catch (err) {
      console.error('Error saving state before unload:', err);
    }
  };
  
  window.addEventListener('beforeunload', saveStateBeforeUnload);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', saveStateBeforeUnload);
  };
}, [interactionState]);

const toggleOpen = () => {
  const newState = !isOpen;
  setIsOpen(newState);
  
  // Close any active panel when closing the menu
  if (!newState) {
    setActivePanel(null);
  }
  
  // Save menu state to interaction state
  setInteractionState(prev => ({
    ...prev,
    menuState: newState ? 'open' : 'closed'
  }));
  
  // Trigger particle animation
  if (!isOpen && !prefersReducedMotion) {
    particleControls.start('animate');
  }
};

const handleCTAClick = (key: string, e?: React.MouseEvent) => {
  // Prevent closing the menu when clicking a CTA
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
  // Handle special actions for certain keys
  if (key === 'calendly') {
    // Open the calendly sidebar
    setActivePanel('calendly');
  } else if (key === 'sociailLogo') {
    // Open the early access popup instead of the sidebar
    import('../EarlyAccessPopup').then(module => {
      const { useEarlyAccessPopup } = module;
      // We need to use this approach since we can't use hooks conditionally
      try {
        const popup = useEarlyAccessPopup();
        popup.openEarlyAccessPopup();
      } catch (error) {
        console.error('Failed to open early access popup:', error);
        // Fallback to the old behavior
        setActivePanel('earlyAccess');
      }
    }).catch(error => {
      console.error('Failed to import EarlyAccessPopup:', error);
      // Fallback to the old behavior
      setActivePanel('earlyAccess');
    });
  }
  
  // Update interaction state
  setInteractionState(prev => ({
    ...prev,
    lastClicked: key,
    visits: {
      ...prev.visits,
      [key]: (prev.visits[key] || 0) + 1
    },
    hasSeenEarlyAccess: key === 'sociailLogo' ? true : prev.hasSeenEarlyAccess
  }));
};

// Define the order of CTAs
const ctaOrder = ['sociailLogo', 'linkedin', 'email', 'calendly'];

const ctaConfigs = {
        sociailLogo: {
    icon: (
      <div className="w-7 h-7 relative flex items-center justify-center">
        <Image 
          src="/images/sociail-logo-with-gray-stroke.svg" 
          alt="Sociail Logo" 
          width={28} 
          height={28} 
          className="object-contain w-[95%] h-[95%]"
        />
      </div>
    ),
    label: 'Join Early Access',
    href: '/early-access',
    bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    hoverBgColor: 'hover:from-blue-700 hover:to-purple-700',
    badge: 'Limited Seats',
    panel: 'earlyAccess'
  },
  linkedin: {
    icon: <Linkedin className="w-6 h-6" />,
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/sualp/',
    bgColor: 'bg-[#0A66C2]',
    hoverBgColor: 'hover:bg-[#084b8e]',
  },
  email: {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email Me',
    href: 'mailto:msualp@sociail.com',
    bgColor: 'bg-gray-700 dark:bg-gray-600',
    hoverBgColor: 'hover:bg-gray-800 dark:hover:bg-gray-700',
  },
  calendly: {
    icon: <CalendarDays className="w-6 h-6" />,
    label: 'Schedule Meeting',
    href: 'https://calendly.com/msualp-main',
    bgColor: 'bg-[#00A2FF]',
    hoverBgColor: 'hover:bg-[#0082cc]',
    panel: 'calendly'
  },
};

// Calculate position styles
const getPositionStyles = () => {
  switch (position) {
    case 'bottom-left':
      return 'bottom-6 left-8';
    case 'top-right':
      return 'top-6 right-8';
    case 'top-left':
      return 'top-6 left-8';
    case 'bottom-right':
    default:
      return 'bottom-6 right-8';
  }
};

// Calculate menu position
const getMenuPosition = () => {
  switch (position) {
    case 'bottom-left':
      return 'absolute bottom-16 left-0 space-y-3 pb-1';
    case 'top-right':
      return 'absolute top-16 right-0 space-y-3 pt-1';
    case 'top-left':
      return 'absolute top-16 left-0 space-y-3 pt-1';
    case 'bottom-right':
    default:
      return 'absolute bottom-16 right-0 space-y-3 pb-1';
  }
};

// Define reduced motion variants
const getVariants = (isReduced: boolean): Record<string, Variants> => {
  if (isReduced) {
    return {
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      menu: {
        initial: { opacity: 0, height: 0, filter: 'blur(8px)' },
        animate: { 
          opacity: 1, 
          height: 'auto', 
          filter: 'blur(0px)',
          transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.25 }
          }
        },
        exit: { 
          opacity: 0, 
          height: 0, 
          filter: 'blur(8px)',
          transition: {
            height: { duration: 0.2, delay: 0.05 },
            opacity: { duration: 0.15 },
            filter: { duration: 0.15 }
          }
        },
      },
      item: {
        initial: { opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)',
          transition: { 
            duration: 0.25,
            filter: { duration: 0.2 }
          }
        },
        exit: { 
          opacity: 0, 
          y: 10, 
          scale: 0.9, 
          filter: 'blur(4px)',
          transition: { 
            duration: 0.2,
            filter: { duration: 0.15 }
          }
        },
      },
      label: {
        initial: { opacity: 0, x: 10, width: 0, filter: 'blur(8px)' },
        animate: { 
          opacity: 1, 
          x: 0, 
          width: 'auto', 
          filter: 'blur(0px)',
          transition: {
            width: { duration: 0.2 },
            opacity: { duration: 0.15 },
            filter: { duration: 0.25 }
          }
        },
        exit: { 
          opacity: 0, 
          x: 10, 
          width: 0, 
          filter: 'blur(8px)',
          transition: {
            width: { duration: 0.15, delay: 0.1 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.15 }
          }
        },
      },
      button: {
        tap: { scale: 1 },
        hover: { scale: 1 },
      },
      particles: {
        initial: { opacity: 0 },
        animate: { opacity: 0 },
      }
    };
  }
  
  return {
    container: {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: 20 },
    },
    menu: {
      initial: { opacity: 0, height: 0, filter: 'blur(8px)' },
      animate: { 
        opacity: 1, 
        height: 'auto', 
        filter: 'blur(0px)',
        transition: {
          height: { duration: 0.3 },
          opacity: { duration: 0.2 },
          filter: { duration: 0.25 }
        }
      },
      exit: { 
        opacity: 0, 
        height: 0, 
        filter: 'blur(8px)',
        transition: {
          height: { duration: 0.2, delay: 0.05 },
          opacity: { duration: 0.15 },
          filter: { duration: 0.15 }
        }
      },
    },
    item: {
      initial: { opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: 'blur(0px)',
        transition: { 
          duration: 0.25,
          filter: { duration: 0.2 }
        }
      },
      exit: { 
        opacity: 0, 
        y: 10, 
        scale: 0.9, 
        filter: 'blur(4px)',
        transition: { 
          duration: 0.2,
          filter: { duration: 0.15 }
        }
      },
    },
    label: {
      initial: { opacity: 0, x: 10, width: 0, filter: 'blur(8px)' },
      animate: { 
        opacity: 1, 
        x: 0, 
        width: 'auto', 
        filter: 'blur(0px)',
        transition: {
          width: { duration: 0.2 },
          opacity: { duration: 0.15 },
          filter: { duration: 0.25 }
        }
      },
      exit: { 
        opacity: 0, 
        x: 10, 
        width: 0, 
        filter: 'blur(8px)',
        transition: {
          width: { duration: 0.15, delay: 0.1 },
          opacity: { duration: 0.2 },
          filter: { duration: 0.15 }
        }
      },
    },
    button: {
      tap: { scale: 0.95 },
      hover: { scale: 1.05 },
    },
    particles: {
      initial: { opacity: 0, scale: 0 },
      animate: { 
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
        transition: { 
          duration: 1.5,
          times: [0, 0.5, 1] 
        }
      }
    }
  };
};

const variants = useMemo(() => getVariants(prefersReducedMotion), [prefersReducedMotion]);

// Calculate blur intensity based on scroll
const blurIntensity = useMemo(() => {
  const baseBlur = 8;
  const scrollBlur = Math.min(Math.floor(scrollY / 100), 10);
  return `${baseBlur + scrollBlur}px`;
}, [scrollY]);

// Generate particles for the animation
const renderParticles = () => {
  if (prefersReducedMotion) return null;
  
  const particles = [];
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * 360;
    const distance = Math.random() * 30 + 20; // 20-50px from center
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;
    
    particles.push(
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-white/20"
        style={{ left: 'calc(50% - 4px)', top: 'calc(50% - 4px)' }}
        variants={variants.particles}
        initial="initial"
        animate={particleControls}
        custom={{ x, y }}
        transition={{ 
          duration: 0.8 + Math.random() * 0.4,
          delay: Math.random() * 0.2 
        }}
        transformTemplate={particleTransformTemplate}
      />
    );
  }
  
  return particles;
};

const sidebarVariants = prefersReducedMotion 
  ? {
      initial: { opacity: 0, x: 300 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 300 },
    }
  : {
      initial: { opacity: 0, x: 300 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300
        }
      },
      exit: { 
        opacity: 0, 
        x: 300,
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 300
        }
      },
    };

// The overlay that appears with the sidebar
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Side panel content components
const renderSidePanelContent = () => {
  switch (activePanel) {
    case 'calendly':
      return (
        <div className="h-full flex flex-col">
          <div className="py-6 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Schedule a Meeting</h3>
            <button 
              onClick={closeSidePanel} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
            <div className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-900">
              {/* Calendly inline widget */}
              <div 
                className="calendly-inline-widget h-full w-full" 
                data-url="https://calendly.com/msualp-main/30min"
                style={{ minHeight: '600px' }}
              >
          </div>
          </div>
          <div className="py-4 px-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={closeSidePanel}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to menu
            </button>
          </div>
        </div>
      );
    case 'earlyAccess':
      return (
        <div className="h-full flex flex-col">
          <div className="py-6 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Join Early Access</h3>
            <button 
              onClick={closeSidePanel} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Get Early Access</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Join our exclusive early access program and be among the first to experience our innovative platform.
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Why are you interested?</label>
                  <textarea 
                    id="reason" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Tell us why you're interested in early access..."
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="button"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-md border border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0" />
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    Only 50 spots available for early access. Apply now!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 px-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={closeSidePanel}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to menu
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

return (
  <>
    {/* Side Panel */}
    <AnimatePresence>
      {activePanel && (
        <motion.div 
          ref={sidePanelRef}
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-800 overflow-hidden"
          variants={sidebarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderSidePanelContent()}
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Floating CTA */}
    <motion.div 
      ref={containerRef}
      className="fixed bottom-6 right-8 z-50 floating-cta-container"
      variants={variants.container}
      initial="initial"
      animate={{
        opacity: mounted ? 1 : 0,
        scale: mounted ? 1 : 0.9,
        y: mounted ? 0 : 20
      }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.5,
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      {/* Noise texture overlay for macOS feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-full overflow-hidden" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />

      <AnimatePresence>
        {isOpen && !activePanel && (
          <motion.div 
            ref={menuRef}
            className="absolute bottom-16 right-0 space-y-5 pb-1"
            variants={variants.menu}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 0.5,
              staggerChildren: prefersReducedMotion ? 0 : 0.12,
              ease: 'easeInOut'
            }}
            style={{ 
              backdropFilter: `blur(${blurIntensity})`,
              WebkitBackdropFilter: `blur(${blurIntensity})` 
            }}
          >
            {ctaOrder.map((key, index) => {
              const config = ctaConfigs[key as keyof typeof ctaConfigs];
              // Check if this is the last clicked item
              const isLastClicked = interactionState.lastClicked === key;
              // Calculate scale factor based on interaction
              const visitCount = interactionState.visits[key] || 0;
              const scaleFactor = isLastClicked ? 1.08 : 1;
              
              return (
                <motion.div 
                  key={key}
                  variants={variants.item}
                  custom={index}
                  whileHover={{ scale: 1.05, x: -2 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.2 : 0.2,
                    delay: prefersReducedMotion ? 0 : 0.05 * (ctaOrder.length - index),
                    type: prefersReducedMotion ? "tween" : "spring"
                  }}
                  className="flex items-center gap-4 justify-end group"
                >
                  <motion.span 
                    variants={variants.label}
                    className="bg-black bg-opacity-95 backdrop-blur-sm dark:bg-white dark:bg-opacity-30 text-white dark:text-white text-sm py-2 px-4 rounded-full shadow-sm border border-gray-800 dark:border-gray-700 flex items-center gap-2 whitespace-nowrap min-w-[160px] justify-end shadow-lg shadow-white/5 dark:shadow-black/40 font-bold hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    {config.label}
                    {key === 'sociailLogo' && !interactionState.hasSeenEarlyAccess && (
                      <span className="inline-flex items-center gap-0.5 bg-red-500/20 text-red-400 dark:text-red-300 text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{config.badge}</span>
                      </span>
                    )}
                  </motion.span>
                  <motion.a 
                    href={config.panel ? "#" : config.href}
                    target={key !== 'sociailLogo' && !config.panel ? '_blank' : undefined}
                    rel={key !== 'sociailLogo' && !config.panel ? 'noopener noreferrer' : undefined}
                    className={`${config.bgColor} ${config.hoverBgColor} text-white rounded-full p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center group-hover:ring-2 group-hover:ring-white/30 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    aria-label={config.label}
                    onClick={(e) => handleCTAClick(key, e)}
                    tabIndex={0}
                    whileTap={variants.button.tap}
                    animate={{
                      scale: isLastClicked ? scaleFactor : 1,
                    }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.2 : 0.4, 
                      type: prefersReducedMotion ? "tween" : "spring",
                    }}
                    style={{ transformOrigin: 'center' }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: prefersReducedMotion ? 1 : 1.5 }}
                      transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
                    />
                    {config.icon}
                    
                    {/* Micro-interaction ring for visited items */}
                    {visitCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full opacity-70" />
                    )}
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center gap-2 justify-end">
        <AnimatePresence mode="wait">
        {isOpen && !activePanel && (
          <motion.h2
            initial={{ x: 48, opacity: 0, rotateY: 90 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: 48, opacity: 0, rotateY: 90 }}
            transition={{
              x: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.3 },
              rotateY: { duration: 0.3, ease: 'easeInOut' }
            }}
            style={{ transformOrigin: 'right center' }}
            className="text-lg md:text-xl lg:text-2xl font-extrabold leading-tight text-center px-2"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let’s Connect!
            </span>
          </motion.h2>
        )}
        </AnimatePresence>
        {/* Don't show the main button when side panel is open */}
        {!activePanel && (
          <motion.button
            onClick={toggleOpen}
            className={`${isOpen ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileTap={variants.button.tap}
            whileHover={variants.button.hover}
          >
            {/* Particle effects */}
            {renderParticles()}
            
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.5 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
            />
            <motion.div
              animate={{ 
                rotate: isOpen ? 180 : 0,
                scale: isOpen ? (prefersReducedMotion ? 1 : [1, 1.2, 1]) : 1,
                filter: [
                  'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
                  'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))',
                  'drop-shadow(0 0 0px rgba(255, 255, 255, 0))'
                ]
              }}
              transition={{ 
                duration: prefersReducedMotion ? 0.2 : 0.3,
                filter: {
                  repeat: isOpen ? 0 : Infinity,
                  repeatType: "reverse",
                  duration: 1.5
                }
              }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        )}
      </div>
    </motion.div>
    
    {/* Overlay when side panel is open */}
    <AnimatePresence>
      {activePanel && (
        <motion.div 
          className="fixed inset-0 bg-black/25 dark:bg-black/40 backdrop-blur-sm z-40"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={closeSidePanel}
        />
      )}
    </AnimatePresence>
  </>
);
}
