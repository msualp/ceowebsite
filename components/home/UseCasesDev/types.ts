'use client';

// Define types for our section names
export type SectionName = 'personal' | 'teams' | 'business';
export type ColorName = 'blue' | 'purple' | 'green';
export type AnimationState = 'running' | 'slowed' | 'paused';

// Type for a tooltip
export type TooltipData = {
  title: string;
  description: string;
  example: string;
  stats: string;
};

// Type for a use case item
export type UseCase = {
  id: string;
  text: string;
  category: SectionName;
  tooltip: TooltipData;
  relatedIds?: string[]; // IDs of related use cases for smart recommendations
  rank?: number; // For user prioritization
  note?: string; // User's personal note
};

// Color configuration
export const colorClasses: Record<ColorName, { 
  bg: string; 
  text: string; 
  dot: string;
  highlight: string;
  border: string;
  gradient: string;
  glow: string;
}> = {
  blue: {
    bg: "bg-blue-200 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-300",
    dot: "bg-blue-500",
    highlight: "bg-blue-100 dark:bg-blue-800",
    border: "border-blue-400 dark:border-blue-600",
    gradient: "from-blue-600 to-blue-400",
    glow: "shadow-blue-500/50"
  },
  purple: {
    bg: "bg-purple-200 dark:bg-purple-900",
    text: "text-purple-800 dark:text-purple-300",
    dot: "bg-purple-500",
    highlight: "bg-purple-100 dark:bg-purple-800",
    border: "border-purple-400 dark:border-purple-600",
    gradient: "from-purple-600 to-purple-400",
    glow: "shadow-purple-500/50"
  },
  green: {
    bg: "bg-green-200 dark:bg-green-900",
    text: "text-green-800 dark:text-green-300",
    dot: "bg-green-500",
    highlight: "bg-green-100 dark:bg-green-800",
    border: "border-green-400 dark:border-green-600",
    gradient: "from-green-600 to-green-400",
    glow: "shadow-green-500/50"
  }
};

// Audio assets - only create Audio objects in browser environment
export const AUDIO = typeof window !== 'undefined' ? {
  select: new Audio('/sounds/select.mp3'),
  deselect: new Audio('/sounds/deselect.mp3'),
  complete: new Audio('/sounds/complete.mp3'),
} : {
  select: null,
  deselect: null,
  complete: null,
};

// Get color class for a category
export const getCategoryColor = (category: SectionName): ColorName => {
  switch (category) {
    case 'personal': return 'blue';
    case 'teams': return 'purple';
    case 'business': return 'green';
  }
};

// Max number of selections allowed
export const MAX_SELECTIONS = 3;
