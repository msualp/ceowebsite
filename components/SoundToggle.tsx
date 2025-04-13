'use client';

import { useState, useEffect } from 'react';

export function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Load sound preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('sound-enabled');
    if (savedPreference !== null) {
      setSoundEnabled(savedPreference === 'true');
    }
  }, []);
  
  // Save sound preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sound-enabled', soundEnabled.toString());
    
    // Dispatch a custom event that other components can listen for
    const event = new CustomEvent('sound-preference-changed', { 
      detail: { enabled: soundEnabled } 
    });
    window.dispatchEvent(event);
  }, [soundEnabled]);
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <button 
      onClick={toggleSound} 
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${soundEnabled ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-transparent text-gray-600 dark:text-gray-400'}`}
      aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
      title={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
    >
      {soundEnabled ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}
