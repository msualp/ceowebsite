'use client';

/**
 * Development-only Accessibility Tester Component
 * 
 * This component provides a UI for running accessibility tests in development mode.
 * It uses the a11y-utils to run axe-core tests and display the results.
 */

import { useState, useEffect } from 'react';
import { AccessibilityTester as A11yInitializer, testAccessibility } from '@/lib/a11y-utils';

export function DevAccessibilityTester() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [selector, setSelector] = useState('#__next');

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const runTest = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      const testResults = await testAccessibility(selector);
      setResults(testResults);
    } catch (error) {
      console.error('[A11y Tester] Error running test:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      {/* Initialize axe-core */}
      <A11yInitializer />
      
      {/* Accessibility tester button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg"
        aria-label="Toggle Accessibility Tester"
        title="Toggle Accessibility Tester"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20"></path>
          <path d="M12 2v20"></path>
          <path d="M12 7a5 5 0 0 1 5 5"></path>
          <path d="M12 7a5 5 0 0 0-5 5"></path>
        </svg>
      </button>
      
      {/* Accessibility tester panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-96 max-h-[80vh] overflow-auto">
          <h2 className="text-lg font-bold mb-4">Accessibility Tester</h2>
          
          <div className="mb-4">
            <label htmlFor="selector" className="block mb-1 text-sm font-medium">
              CSS Selector:
            </label>
            <div className="flex gap-2">
              <input
                id="selector"
                type="text"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                placeholder="CSS Selector (e.g., #__next)"
              />
              <button
                onClick={runTest}
                disabled={isRunning}
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run Test'}
              </button>
            </div>
          </div>
          
          {results && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Results:</h3>
              
              {results.violations.length === 0 ? (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md">
                  No violations found! 🎉
                </div>
              ) : (
                <div>
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md mb-3">
                    {results.violations.length} violations found
                  </div>
                  
                  <div className="space-y-4">
                    {results.violations.map((violation: any, index: number) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <h4 className="font-bold">
                          {index + 1}. {violation.id} - {violation.impact} impact
                        </h4>
                        <p className="text-sm mb-1">{violation.description}</p>
                        <p className="text-sm mb-1">{violation.help}</p>
                        <a
                          href={violation.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Learn more
                        </a>
                        
                        <h5 className="font-medium mt-2 mb-1">Affected elements:</h5>
                        <div className="space-y-2">
                          {violation.nodes.map((node: any, nodeIndex: number) => (
                            <div key={nodeIndex} className="text-xs p-2 bg-gray-100 dark:bg-gray-900 rounded">
                              <code className="block mb-1 whitespace-pre-wrap">{node.html}</code>
                              <p className="whitespace-pre-wrap">{node.failureSummary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={toggleVisibility}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
