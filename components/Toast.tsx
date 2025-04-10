// components/Toast.tsx
'use client';

import { useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamationTriangle } from 'react-icons/hi2';
import clsx from 'clsx';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose?: () => void;
  duration?: number; // in ms
}

const iconMap = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
  warning: HiExclamationTriangle,
};

const bgMap = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

export default function Toast({ type, message, onClose, duration }: ToastProps) {
  const Icon = iconMap[type];

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose?.();
    }, duration || 3000);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <div
      onClick={onClose}
      role="alert"
      aria-live="assertive"
      className={clsx(
        'fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg z-50 flex items-center gap-2 animate-fade-in-out cursor-pointer',
        bgMap[type]
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}