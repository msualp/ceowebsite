/**
 * Blog/Insights styling utility functions
 * These functions provide consistent styling across blog components
 */

import { format, parseISO } from 'date-fns';

/**
 * Get tag styles based on color and hover state
 * This is a comprehensive function that works across all contexts
 * 
 * @param color - The color theme for the tag
 * @param isHovered - Whether the parent element is hovered
 * @param variant - The style variant to use (default, featured, compact)
 * @returns CSS class string for the tag
 */
export function getTagStyles(
  color: string = 'blue', 
  isHovered: boolean = false,
  variant: 'default' | 'featured' | 'compact' | 'hero' = 'default'
): string {
  // Base classes shared across all variants
  const baseClasses = "inline-flex items-center rounded-full text-xs font-medium transition-all duration-300 border";
  
  // Size classes based on variant
  const sizeClasses = {
    default: "px-3 py-1",
    featured: "px-3 py-1",
    compact: "px-2.5 py-0.5",
    hero: "px-3 py-1"
  };
  
  // Color mapping for different states and variants
  const colorMap: Record<string, Record<string, string>> = {
    // Default variant color mapping
    default: {
      blue: isHovered 
        ? "bg-blue-500 text-white border-transparent" 
        : "bg-white/70 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30",
      indigo: isHovered 
        ? "bg-indigo-500 text-white border-transparent" 
        : "bg-white/70 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/30",
      emerald: isHovered 
        ? "bg-emerald-500 text-white border-transparent" 
        : "bg-white/70 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30",
      teal: isHovered 
        ? "bg-teal-500 text-white border-transparent" 
        : "bg-white/70 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/30",
      purple: isHovered 
        ? "bg-purple-500 text-white border-transparent" 
        : "bg-white/70 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30",
      fuchsia: isHovered 
        ? "bg-fuchsia-500 text-white border-transparent" 
        : "bg-white/70 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:border-fuchsia-800/30",
      green: isHovered 
        ? "bg-green-500 text-white border-transparent" 
        : "bg-white/70 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30",
      amber: isHovered 
        ? "bg-amber-500 text-white border-transparent" 
        : "bg-white/70 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30",
      red: isHovered 
        ? "bg-red-500 text-white border-transparent" 
        : "bg-white/70 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30",
      gray: isHovered 
        ? "bg-gray-500 text-white border-transparent" 
        : "bg-white/70 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/30",
    },
    
    // Featured variant color mapping (used in featured articles)
    featured: {
      blue: isHovered 
        ? "bg-blue-500 text-white border-transparent" 
        : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30",
      indigo: isHovered 
        ? "bg-indigo-500 text-white border-transparent" 
        : "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30",
      emerald: isHovered 
        ? "bg-emerald-500 text-white border-transparent" 
        : "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/30",
      teal: isHovered 
        ? "bg-teal-500 text-white border-transparent" 
        : "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800/30",
      purple: isHovered 
        ? "bg-purple-500 text-white border-transparent" 
        : "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/30",
      fuchsia: isHovered 
        ? "bg-fuchsia-500 text-white border-transparent" 
        : "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800/30",
      green: isHovered 
        ? "bg-green-500 text-white border-transparent" 
        : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30",
      amber: isHovered 
        ? "bg-amber-500 text-white border-transparent" 
        : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30",
      red: isHovered 
        ? "bg-red-500 text-white border-transparent" 
        : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30",
      gray: isHovered 
        ? "bg-gray-500 text-white border-transparent" 
        : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800/30",
    },
    
    // Compact variant color mapping (used in smaller cards)
    compact: {
      blue: isHovered 
        ? "bg-blue-500 text-white border-transparent" 
        : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/20",
      indigo: isHovered 
        ? "bg-indigo-500 text-white border-transparent" 
        : "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/20",
      emerald: isHovered 
        ? "bg-emerald-500 text-white border-transparent" 
        : "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/20",
      teal: isHovered 
        ? "bg-teal-500 text-white border-transparent" 
        : "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/20",
      purple: isHovered 
        ? "bg-purple-500 text-white border-transparent" 
        : "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/20",
      fuchsia: isHovered 
        ? "bg-fuchsia-500 text-white border-transparent" 
        : "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:border-fuchsia-800/20",
      green: isHovered 
        ? "bg-green-500 text-white border-transparent" 
        : "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/20",
      amber: isHovered 
        ? "bg-amber-500 text-white border-transparent" 
        : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/20",
      red: isHovered 
        ? "bg-red-500 text-white border-transparent" 
        : "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/20",
      gray: isHovered 
        ? "bg-gray-500 text-white border-transparent" 
        : "bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/20",
    },
    
    // Hero variant color mapping (used in hero sections with dark backgrounds)
    hero: {
      blue: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      indigo: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      emerald: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      teal: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      purple: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      fuchsia: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      green: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      amber: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      red: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
      gray: "bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30",
    }
  };
  
  // Get the appropriate color classes based on variant and color
  const colorClasses = colorMap[variant][color] || colorMap[variant].blue;
  
  // Combine all classes
  return `${baseClasses} ${sizeClasses[variant]} ${colorClasses}`;
}

/**
 * Format a date string into a human-readable format
 * 
 * @param dateString - ISO date string
 * @param formatString - Format string (default: 'MMMM d, yyyy')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, formatString: string = 'MMMM d, yyyy'): string {
  if (!dateString) return '';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return the original string if parsing fails
  }
}

/**
 * Calculate reading time for content
 * 
 * @param content - The content to calculate reading time for
 * @param wordsPerMinute - Words per minute reading speed (default: 200)
 * @returns Reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  if (!content) return '1 min read';
  
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  return `${minutes} min read`;
}

/**
 * Get gradient classes for a color
 * 
 * @param color - Base color name
 * @returns Tailwind gradient classes
 */
export function getGradientClasses(color: string = 'blue'): string {
  const gradientMap: Record<string, string> = {
    blue: 'from-blue-500 to-indigo-600',
    indigo: 'from-indigo-500 to-purple-600',
    purple: 'from-purple-500 to-fuchsia-600',
    fuchsia: 'from-fuchsia-500 to-pink-600',
    pink: 'from-pink-500 to-rose-600',
    rose: 'from-rose-500 to-red-600',
    red: 'from-red-500 to-orange-600',
    orange: 'from-orange-500 to-amber-600',
    amber: 'from-amber-500 to-yellow-600',
    yellow: 'from-yellow-500 to-lime-600',
    lime: 'from-lime-500 to-green-600',
    green: 'from-green-500 to-emerald-600',
    emerald: 'from-emerald-500 to-teal-600',
    teal: 'from-teal-500 to-cyan-600',
    cyan: 'from-cyan-500 to-blue-600',
    gray: 'from-gray-500 to-slate-600',
  };
  
  return gradientMap[color] || gradientMap.blue;
}

/**
 * Get background color classes for a color
 * 
 * @param color - Base color name
 * @param opacity - Opacity level (10, 20, etc.)
 * @returns Tailwind background color classes
 */
export function getBgColorClasses(color: string = 'blue', opacity: number = 10): string {
  const opacityValue = opacity >= 100 ? '' : `/${opacity}`;
  
  return `bg-${color}-500${opacityValue}`;
}

/**
 * Get text color classes for a color
 * 
 * @param color - Base color name
 * @returns Tailwind text color classes
 */
export function getTextColorClasses(color: string = 'blue'): string {
  return `text-${color}-600 dark:text-${color}-400`;
}
