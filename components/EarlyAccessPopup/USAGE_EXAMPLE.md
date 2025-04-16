# EarlyAccessPopup Usage Guide

This document explains how to integrate the EarlyAccessPopup component into your application.

## Setup

1. First, add the `EarlyAccessPopupProvider` to your application, typically in your root layout or app component:

```tsx
// app/layout.tsx
import { EarlyAccessPopupProvider } from '@/components/EarlyAccessPopup';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EarlyAccessPopupProvider>
          {children}
        </EarlyAccessPopupProvider>
      </body>
    </html>
  );
}
```

2. The existing `EarlyAccessCTA` component has been updated to use the popup automatically. No changes are needed there.

3. For custom components that need to trigger the popup, use the `useEarlyAccessPopup` hook:

```tsx
// YourCustomComponent.tsx
'use client';

import { useEarlyAccessPopup } from '@/components/EarlyAccessPopup';

export function YourCustomComponent() {
  const { openEarlyAccessPopup } = useEarlyAccessPopup();
  
  return (
    <button 
      onClick={openEarlyAccessPopup}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Join Early Access
    </button>
  );
}
```

## How It Works

1. The `EarlyAccessPopupProvider` wraps your application and provides the popup context.
2. The `EarlyAccessPopup` component is included within the provider and is hidden by default.
3. When a user clicks on an "Early Access" CTA button, the popup is displayed.
4. The popup collects user information through a multi-step form.
5. On submission, a success message is shown with confetti animation.

## Available Hooks

- `useEarlyAccessPopup()`: Returns `{ openEarlyAccessPopup, closeEarlyAccessPopup }` functions to control the popup.

## Components

- `EarlyAccessPopupProvider`: Context provider that should wrap your application.
- `EarlyAccessPopup`: The actual popup component (automatically included in the provider).

## Customization

The popup appearance and behavior can be customized by modifying the following files:

- `constants.ts`: Contains configuration values like animation duration and form steps.
- `types.ts`: TypeScript interfaces for the component.
- Step components in the `steps/` directory: Customize the form steps.
- UI components in the `ui/` directory: Customize the UI elements.
