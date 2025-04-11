/**
 * Color Contrast Checker Utility
 * 
 * This utility provides functions to check color contrast according to WCAG 2.1 guidelines.
 * It calculates contrast ratios and determines if they meet AA or AAA standards.
 */

// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  let r, g, b;
  if (hex.length === 3) {
    // Short notation (#RGB)
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    // Full notation (#RRGGBB)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  return { r, g, b };
}

// Calculate relative luminance for RGB values
export function calculateLuminance(rgb: { r: number; g: number; b: number }): number {
  // Convert RGB values to sRGB
  const sRGB = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  };
  
  // Calculate RGB values for luminance
  const rgbForLuminance = {
    r: sRGB.r <= 0.03928 ? sRGB.r / 12.92 : Math.pow((sRGB.r + 0.055) / 1.055, 2.4),
    g: sRGB.g <= 0.03928 ? sRGB.g / 12.92 : Math.pow((sRGB.g + 0.055) / 1.055, 2.4),
    b: sRGB.b <= 0.03928 ? sRGB.b / 12.92 : Math.pow((sRGB.b + 0.055) / 1.055, 2.4)
  };
  
  // Calculate luminance
  return 0.2126 * rgbForLuminance.r + 0.7152 * rgbForLuminance.g + 0.0722 * rgbForLuminance.b;
}

// Calculate contrast ratio between two colors
export function calculateContrastRatio(color1: string, color2: string): number {
  const luminance1 = calculateLuminance(hexToRgb(color1));
  const luminance2 = calculateLuminance(hexToRgb(color2));
  
  // Determine lighter and darker luminance
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  // Calculate contrast ratio
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast ratio meets WCAG 2.1 standards
export function checkContrast(
  foreground: string,
  background: string
): {
  ratio: number;
  AA_normal: boolean;
  AA_large: boolean;
  AAA_normal: boolean;
  AAA_large: boolean;
} {
  const ratio = calculateContrastRatio(foreground, background);
  
  return {
    ratio,
    AA_normal: ratio >= 4.5,   // AA standard for normal text (4.5:1)
    AA_large: ratio >= 3,      // AA standard for large text (3:1)
    AAA_normal: ratio >= 7,    // AAA standard for normal text (7:1)
    AAA_large: ratio >= 4.5    // AAA standard for large text (4.5:1)
  };
}

// Format contrast ratio for display
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

// Get contrast status text
export function getContrastStatusText(result: ReturnType<typeof checkContrast>): string {
  if (result.AAA_normal) {
    return 'Excellent (AAA)';
  } else if (result.AAA_large) {
    return 'Good (AAA Large, AA Normal)';
  } else if (result.AA_large) {
    return 'Fair (AA Large)';
  } else {
    return 'Poor (Fails WCAG)';
  }
}

// Get contrast status color
export function getContrastStatusColor(result: ReturnType<typeof checkContrast>): string {
  if (result.AAA_normal) {
    return '#22c55e'; // green-500
  } else if (result.AAA_large) {
    return '#3b82f6'; // blue-500
  } else if (result.AA_large) {
    return '#f59e0b'; // amber-500
  } else {
    return '#ef4444'; // red-500
  }
}

// Common color combinations to check
export const commonColorCombinations = [
  { name: 'Text on Background', foreground: '#1f2937', background: '#ffffff' },
  { name: 'Text on Background (Dark)', foreground: '#f3f4f6', background: '#111827' },
  { name: 'Primary Button Text', foreground: '#ffffff', background: '#3b82f6' },
  { name: 'Secondary Button Text', foreground: '#1f2937', background: '#e5e7eb' },
  { name: 'Link Text', foreground: '#2563eb', background: '#ffffff' },
  { name: 'Link Text (Dark)', foreground: '#60a5fa', background: '#111827' },
  { name: 'Error Text', foreground: '#ef4444', background: '#ffffff' },
  { name: 'Error Text (Dark)', foreground: '#f87171', background: '#111827' },
];
