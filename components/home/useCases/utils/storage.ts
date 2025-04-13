'use client';

/**
 * Storage utility that provides localStorage with cookie fallback
 */

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 30): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

const removeCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

// Storage interface
export const storage = {
  /**
   * Set an item in storage (localStorage with cookie fallback)
   */
  setItem: (key: string, value: string): void => {
    try {
      if (isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
      } else {
        setCookie(key, value);
      }
    } catch (error) {
      console.error('Error in storage.setItem:', error);
      // Fallback to cookies if localStorage fails for any reason
      try {
        setCookie(key, value);
      } catch (cookieError) {
        console.error('Cookie fallback also failed:', cookieError);
      }
    }
  },

  /**
   * Get an item from storage (localStorage with cookie fallback)
   */
  getItem: (key: string): string | null => {
    try {
      if (isLocalStorageAvailable()) {
        return localStorage.getItem(key);
      } else {
        return getCookie(key);
      }
    } catch (error) {
      console.error('Error in storage.getItem:', error);
      // Fallback to cookies if localStorage fails for any reason
      try {
        return getCookie(key);
      } catch (cookieError) {
        console.error('Cookie fallback also failed:', cookieError);
        return null;
      }
    }
  },

  /**
   * Remove an item from storage (localStorage with cookie fallback)
   */
  removeItem: (key: string): void => {
    try {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem(key);
      } else {
        removeCookie(key);
      }
    } catch (error) {
      console.error('Error in storage.removeItem:', error);
      // Fallback to cookies if localStorage fails for any reason
      try {
        removeCookie(key);
      } catch (cookieError) {
        console.error('Cookie fallback also failed:', cookieError);
      }
    }
  },

  /**
   * Check if storage is available
   */
  isAvailable: (): boolean => {
    return isLocalStorageAvailable() || navigator.cookieEnabled;
  }
};
