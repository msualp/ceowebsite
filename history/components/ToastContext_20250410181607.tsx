'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast, { ToastType } from './Toast';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  maxVisible = 3,
  iconsOnly = false,
}: {
  children: React.ReactNode;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  maxVisible?: number;
  iconsOnly?: boolean;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration || 3000);
  }, []);

  const positionClassMap = {
    'top-right': 'fixed top-4 right-4 flex flex-col gap-2 z-50',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50',
    'bottom-right': 'fixed bottom-4 right-4 flex flex-col gap-2 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50',
  };

  const positionClass = positionClassMap[position] || 'fixed bottom-4 right-4 flex flex-col gap-2 z-50';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(
        <div className={positionClass}>
          {toasts.slice(-maxVisible).map(({ id, type, message, duration }) => (
            <Toast
              key={id}
              type={type}
              message={iconsOnly ? '' : message}
              duration={duration}
              onClose={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
