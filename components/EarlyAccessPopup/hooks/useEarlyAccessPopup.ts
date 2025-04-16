'use client';

import { usePopup } from '../context/PopupContext';

/**
 * Hook to control the Early Access Popup
 * This can be used in any component to show or hide the popup
 */
export const useEarlyAccessPopup = () => {
  const { showPopup, hidePopup } = usePopup();
  
  return {
    /**
     * Show the Early Access Popup
     */
    openEarlyAccessPopup: showPopup,
    
    /**
     * Hide the Early Access Popup
     */
    closeEarlyAccessPopup: hidePopup
  };
};

export default useEarlyAccessPopup;
