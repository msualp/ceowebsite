'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface HeadingContextType {
  level: number;
  incrementLevel: () => void;
  decrementLevel: () => void;
}

// Create the context with default values
const HeadingContext = createContext<HeadingContextType>({
  level: 1,
  incrementLevel: () => {},
  decrementLevel: () => {},
});

// Custom hook to use the heading context
export function useHeadingLevel() {
  return useContext(HeadingContext);
}

interface HeadingProviderProps {
  children: ReactNode;
  initialLevel?: number;
}

// Provider component
export function HeadingProvider({ children, initialLevel = 1 }: HeadingProviderProps) {
  const [level, setLevel] = useState(initialLevel);

  const incrementLevel = () => {
    setLevel((prevLevel) => Math.min(prevLevel + 1, 6));
  };

  const decrementLevel = () => {
    setLevel((prevLevel) => Math.max(prevLevel - 1, 1));
  };

  return (
    <HeadingContext.Provider value={{ level, incrementLevel, decrementLevel }}>
      {children}
    </HeadingContext.Provider>
  );
}

// Heading component that automatically uses the correct heading level
interface HeadingProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Heading({ children, className = '', id }: HeadingProps) {
  const { level } = useHeadingLevel();
  
  // Dynamically render the appropriate heading level
  switch (level) {
    case 1:
      return <h1 id={id} className={className}>{children}</h1>;
    case 2:
      return <h2 id={id} className={className}>{children}</h2>;
    case 3:
      return <h3 id={id} className={className}>{children}</h3>;
    case 4:
      return <h4 id={id} className={className}>{children}</h4>;
    case 5:
      return <h5 id={id} className={className}>{children}</h5>;
    case 6:
      return <h6 id={id} className={className}>{children}</h6>;
    default:
      return <h2 id={id} className={className}>{children}</h2>;
  }
}

// Section component that increments the heading level for its children
interface HeadingSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export function HeadingSection({ children, className = '', id, ariaLabel }: HeadingSectionProps) {
  const { level, incrementLevel, decrementLevel } = useHeadingLevel();
  
  // Increment the heading level for children
  React.useEffect(() => {
    incrementLevel();
    return () => decrementLevel();
  }, [incrementLevel, decrementLevel]);
  
  return (
    <section id={id} className={className} aria-label={ariaLabel}>
      {children}
    </section>
  );
}
