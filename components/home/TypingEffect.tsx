// TypingEffect.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ text, delay = 50, onComplete = () => {}, cursorBlinkSpeed = 530 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasCalledOnComplete = useRef(false);
  
  // Reset state if text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    hasCalledOnComplete.current = false;
  }, [text]);
  
  useEffect(() => {
    // If we've already typed the full text, mark as complete
    if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
      return;
    }
    
    // If not complete, continue typing
    if (!isComplete) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, isComplete, text]);
  
  // Only call onComplete once when animation is done
  useEffect(() => {
    if (isComplete && !hasCalledOnComplete.current) {
      hasCalledOnComplete.current = true;
      onComplete();
    }
  }, [isComplete, onComplete]);
  
  return (
    <div className="inline-block">
      <span>{displayText}</span>
      <span 
        className={`inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-current ${isComplete ? 'animate-cursor-blink' : ''}`} 
        style={{ 
          animationDuration: `${cursorBlinkSpeed}ms`,
          verticalAlign: 'middle'
        }}
      ></span>
    </div>
  );
};

export default TypingEffect;