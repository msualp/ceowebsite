'use client';

import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { PopupWrapperProps } from '../types';
import { ANIMATION_DURATION } from '../constants';

/**
 * Wrapper component for the popup modal
 */
const PopupWrapper: React.FC<PopupWrapperProps> = ({ 
  isVisible, 
  isExiting, 
  handleClose, 
  children,
  className = ''
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible, handleClose]);

  // Focus trap
  useEffect(() => {
    if (isVisible && closeButtonRef.current) {
      // Focus the close button when the popup opens
      closeButtonRef.current.focus();
    }
  }, [isVisible]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div 
        ref={popupRef}
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 border-2 border-indigo-100 dark:border-indigo-800 ${
          isExiting 
            ? 'opacity-0 scale-95' 
            : 'opacity-100 scale-100'
        } ${className}`}
        style={{ 
          transitionDuration: `${ANIMATION_DURATION}ms`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Close button */}
        <button 
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full"
          aria-label="Close popup"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="py-6">
          <h2 id="popup-title" className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sociail Early Access
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupWrapper;
