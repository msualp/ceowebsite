/**
 * Animation Utilities
 * 
 * This file contains utility functions for handling animations and effects
 * across the website, particularly for scroll-based animations.
 */

/**
 * Initialize scroll animations for elements with specific classes
 * This should be called in useEffect or componentDidMount
 */
export function initScrollAnimations() {
  // Set up the Intersection Observer for fade-in-scroll elements
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation has played, we can stop observing this element
          // fadeObserver.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.15, // Trigger when at least 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly before the element comes into view
    }
  );

  // Observe all elements with the fade-in-scroll class
  document.querySelectorAll('.fade-in-scroll').forEach((el) => {
    fadeObserver.observe(el);
  });

  // Set up the Intersection Observer for staggered fade-in lists
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // staggerObserver.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all elements with the stagger-fade-in class
  document.querySelectorAll('.stagger-fade-in').forEach((el) => {
    staggerObserver.observe(el);
  });

  return () => {
    // Cleanup function to disconnect observers when component unmounts
    fadeObserver.disconnect();
    staggerObserver.disconnect();
  };
}

/**
 * Add image hover effects to elements with specific classes
 * This adds event listeners for mouse interactions
 */
export function initImageHoverEffects() {
  // For images that should reveal captions on hover
  document.querySelectorAll('.img-with-caption').forEach((container) => {
    const img = container.querySelector('img');
    const caption = container.querySelector('.caption-reveal');
    
    if (!img || !caption) return;
    
    // Add grayscale class to image if not already present
    if (!img.classList.contains('img-grayscale')) {
      img.classList.add('img-grayscale');
    }
    
    // Make sure container has group class for hover effects
    if (!container.classList.contains('group')) {
      container.classList.add('group');
    }
  });
}

/**
 * Initialize Mac glass effect for elements
 * This adds the appropriate classes based on the element's data attributes
 */
export function initMacGlassEffects() {
  // Apply mac-glass class to elements with data-glass attribute
  document.querySelectorAll('[data-glass]').forEach((el) => {
    const glassType = el.getAttribute('data-glass');
    
    if (glassType === 'blue') {
      el.classList.add('mac-glass-blue');
    } else if (glassType === 'purple') {
      el.classList.add('mac-glass-purple');
    } else {
      el.classList.add('mac-glass');
    }
  });
}

/**
 * Initialize icon hover effects
 */
export function initIconHoverEffects() {
  // Apply icon-hover class to all SVG icons within icon containers
  document.querySelectorAll('.icon-container svg').forEach((svg) => {
    svg.classList.add('icon-hover');
  });
}

/**
 * Initialize all animations and effects
 * This is the main function that should be called in your components
 */
export function initAllAnimations() {
  // Wait for DOM to be fully loaded
  if (typeof window !== 'undefined') {
    // Run on next tick to ensure DOM is ready
    setTimeout(() => {
      initScrollAnimations();
      initImageHoverEffects();
      initMacGlassEffects();
      initIconHoverEffects();
    }, 0);
  }
  
  // Return cleanup function
  return () => {
    // Any cleanup needed
  };
}

/**
 * Helper function to add animation classes to elements
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationType - The type of animation to apply
 */
export function animateElement(element, animationType) {
  if (!element) return;
  
  switch (animationType) {
    case 'fadeIn':
      element.classList.add('fade-in-scroll');
      // Trigger the animation immediately
      setTimeout(() => {
        element.classList.add('visible');
      }, 50);
      break;
      
    case 'scale':
      element.classList.add('hover-scale');
      break;
      
    case 'lift':
      element.classList.add('hover-lift');
      break;
      
    case 'pulse':
      element.classList.add('pulse');
      break;
      
    case 'blob':
      element.classList.add('blob-animation');
      break;
      
    default:
      break;
  }
}

/**
 * Create a React hook for animations
 * This can be used in React components
 */
export function useAnimations() {
  if (typeof window === 'undefined') {
    // Return empty functions for SSR
    return {
      initScrollAnimations: () => {},
      initImageHoverEffects: () => {},
      initMacGlassEffects: () => {},
      initIconHoverEffects: () => {},
      initAllAnimations: () => () => {},
      animateElement: () => {},
    };
  }
  
  return {
    initScrollAnimations,
    initImageHoverEffects,
    initMacGlassEffects,
    initIconHoverEffects,
    initAllAnimations,
    animateElement,
  };
}
