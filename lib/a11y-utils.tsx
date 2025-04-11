'use client';

/**
 * Accessibility Testing Utilities
 * 
 * This file contains utilities for testing accessibility in development mode.
 * It uses axe-core to run automated accessibility tests and report issues.
 */

import React, { useEffect } from 'react';

// Only import axe-core in development mode
let axe: any = null;
let ReactAxe: any = null;

// Initialize axe-core in development mode
export function initAxe() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Dynamically import axe-core and @axe-core/react
  import('axe-core').then((axeModule) => {
    axe = axeModule.default;
    
    import('@axe-core/react').then((ReactAxeModule) => {
      ReactAxe = ReactAxeModule.default;
      
      // Initialize axe
      ReactAxe(React, axe, {
        rules: [
          // Include specific rules or override rule configurations
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-required-children', enabled: true },
          { id: 'aria-required-parent', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'document-title', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true },
          { id: 'heading-order', enabled: true },
          { id: 'html-has-lang', enabled: true },
          { id: 'image-alt', enabled: true },
          { id: 'input-button-name', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
          { id: 'list', enabled: true },
          { id: 'listitem', enabled: true },
          { id: 'meta-viewport', enabled: true },
          { id: 'region', enabled: true },
        ],
      });
      
      console.log('[Accessibility] axe-core initialized for automated testing');
    });
  });
}

/**
 * Component that initializes axe-core for accessibility testing
 * This should only be used in development mode
 */
export function AccessibilityTester() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initAxe();
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}

/**
 * Run an accessibility test on a specific element
 * 
 * @param selector - CSS selector for the element to test
 */
export async function testAccessibility(selector: string = '#__next') {
  if (process.env.NODE_ENV !== 'development' || !axe) {
    console.warn('[Accessibility] axe-core is not available or not in development mode');
    return;
  }
  
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`[Accessibility] Element not found: ${selector}`);
      return;
    }
    
    const results = await axe.run(element);
    
    // Log the results
    if (results.violations.length === 0) {
      console.log('[Accessibility] No violations found! 🎉');
    } else {
      console.warn(`[Accessibility] ${results.violations.length} violations found:`);
      results.violations.forEach((violation: any, index: number) => {
        console.group(`${index + 1}. ${violation.id} - ${violation.impact} impact`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Help URL: ${violation.helpUrl}`);
        console.log('Affected elements:');
        violation.nodes.forEach((node: any) => {
          console.log(`- ${node.html}`);
          console.log(`  ${node.failureSummary}`);
        });
        console.groupEnd();
      });
    }
    
    return results;
  } catch (error) {
    console.error('[Accessibility] Error running axe-core:', error);
  }
}
