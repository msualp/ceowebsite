'use client';

// Simple storage utility for client-side persistence
// Uses localStorage when available, with fallbacks for SSR

// Type for storage operations
type StorageType = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

// Create a storage object that works in both browser and SSR contexts
const createStorage = (): StorageType => {
  if (typeof window === 'undefined') {
    // Server-side rendering - provide no-op implementation
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  
  // Check if localStorage is available
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    
    return {
      getItem: (key: string) => localStorage.getItem(key),
      setItem: (key: string, value: string) => localStorage.setItem(key, value),
      removeItem: (key: string) => localStorage.removeItem(key),
    };
  } catch (e) {
    // localStorage not available or permission denied
    // Fallback to in-memory storage
    console.warn('localStorage not available, using in-memory storage');
    const memoryStorage: Record<string, string> = {};
    
    return {
      getItem: (key: string) => memoryStorage[key] || null,
      setItem: (key: string, value: string) => { memoryStorage[key] = value; },
      removeItem: (key: string) => { delete memoryStorage[key]; },
    };
  }
};

// Export the storage instance
export const storage = createStorage();
