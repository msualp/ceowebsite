'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
  isVisible: boolean;
  showPopup: () => void;
  hidePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showPopup = () => setIsVisible(true);
  const hidePopup = () => setIsVisible(false);

  return (
    <PopupContext.Provider value={{ isVisible, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
