'use client';

import React from 'react';
import { PopupProvider } from './context/PopupContext';
import EarlyAccessPopup from './EarlyAccessPopup';

/**
 * Provider component that wraps the application and provides the popup context
 * This component should be placed near the root of your application
 */
export const EarlyAccessPopupProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <PopupProvider>
      {children}
      <EarlyAccessPopup />
    </PopupProvider>
  );
};

export default EarlyAccessPopupProvider;
