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
        d="M42.7,-57.2C55.9,-47.3,67.4,-35.1,73.3,-20.1C79.1,-5.1,79.3,12.7,72.6,27.4C66,42.1,52.5,53.8,37.7,62.2C22.9,70.7,6.7,75.9,-8.9,73.8C-24.5,71.7,-39.5,62.3,-51.6,49.9C-63.7,37.5,-72.9,22.1,-75.1,5.4C-77.3,-11.3,-72.5,-29.3,-61.6,-42.1C-50.7,-54.9,-33.7,-62.5,-17.5,-65.8C-1.3,-69.1,14.1,-68.1,29.5,-67.1C44.9,-66.1,60.3,-65.1,42.7,-57.2Z" 
        transform="translate(100 100)" 
      />
    </svg>
  );
}

export function CirclePattern({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`w-full h-full ${className}`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="30" cy="10" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="10" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="70" cy="10" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="90" cy="10" r="2" fill="currentColor" fillOpacity="0.1" />
      
      <circle cx="10" cy="30" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="30" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="70" cy="30" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="90" cy="30" r="2" fill="currentColor" fillOpacity="0.1" />
      
      <circle cx="10" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="30" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="70" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="90" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
      
      <circle cx="10" cy="70" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="30" cy="70" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="70" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="70" cy="70" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="90" cy="70" r="2" fill="currentColor" fillOpacity="0.1" />
      
      <circle cx="10" cy="90" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="30" cy="90" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="90" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="70" cy="90" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="90" cy="90" r="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}
