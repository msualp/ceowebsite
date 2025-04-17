'use client';

import { useEffect } from 'react';

/**
 * Initialize scroll animations by observing elements with animation classes
 * and adding the 'visible' class when they enter the viewport
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-scroll, .stagger-fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  
  return () => {
    animatedElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
}

/**
 * Initialize all animations
 * This function should be called in the useEffect hook of components
 * that use animations
 */
export function initAllAnimations() {
  const cleanupScrollAnimations = initScrollAnimations();
  
  return () => {
    cleanupScrollAnimations();
  };
}

/**
 * React hook for animations
 * This hook initializes all animations when the component mounts
 * and cleans them up when the component unmounts
 * 
 * @param dependency Optional dependency to trigger re-initialization of animations
 */
export function useAnimations(dependency?: any) {
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, [dependency]);
}

/**
 * Animation variants for Framer Motion
 * These can be used with the Framer Motion library for consistent animations
 */
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }
};

/**
 * Animation durations
 * These can be used to ensure consistent animation durations across the site
 */
export const animationDurations = {
  fast: 150,
  default: 300,
  slow: 500,
  extraSlow: 800
};

/**
 * Animation timing functions
 * These can be used to ensure consistent animation timing functions across the site
 */
export const animationTimingFunctions = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
};
