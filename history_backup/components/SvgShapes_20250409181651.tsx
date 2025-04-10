'use client';

export function WaveDivider({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`w-full h-24 ${className}`} 
      viewBox="0 0 1440 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 80C1248 89 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" 
        fill="currentColor" 
        fillOpacity="0.2"
      />
    </svg>
  );
}

export function BlobShape({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`w-64 h-64 ${className}`} 
      viewBox="0 0 200 200" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
