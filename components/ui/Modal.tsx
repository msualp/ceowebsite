import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  description,
  actions,
  children,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full transform transition-all duration-300 ease-out ${className}`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()} // prevent click outside from bubbling
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            )}
            {children}
            {actions && <div className="flex justify-end gap-2 mt-4">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;