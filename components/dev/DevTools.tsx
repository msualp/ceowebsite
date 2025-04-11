'use client';

import dynamic from 'next/dynamic';

// Dynamically import the development-only components
// This ensures they're only loaded in development mode
const DevAccessibilityTester = dynamic(
  () => import('@/components/dev/AccessibilityTester').then(mod => mod.DevAccessibilityTester),
  { ssr: false }
);

const DevContrastChecker = dynamic(
  () => import('@/components/dev/ContrastChecker').then(mod => mod.ContrastChecker),
  { ssr: false }
);

export function DevTools() {
  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <DevAccessibilityTester />
      <DevContrastChecker />
    </>
  );
}
