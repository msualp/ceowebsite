'use client';

import { useState, useEffect } from 'react';

export default function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      // Reset tabIndex after a short delay to avoid issues with screen readers
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 100);
    }
  };
  
  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12 pointer-events-none'}
      `}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      Skip to content
    </a>
  );
}
