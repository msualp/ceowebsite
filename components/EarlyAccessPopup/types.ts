/**
 * Type definitions for the EarlyAccessPopup component
 */

// Form data interface
export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  aiExperience: string;
  aiInterest: string;
  userType: string[];
  referralSource: string;
  otherReferral: string;
}

// Form state interface
export interface FormState {
  formData: FormData;
  formError: string;
  currentStep: number;
  isSubmitting: boolean;
}

// Form action types
export type FormAction = 
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'UPDATE_CHECKBOX'; field: string; checked: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET_FORM' };

// Step component props
export interface StepProps {
  formData: FormData;
  formError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Form navigation props
export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

// Progress bar props
export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

// Popup wrapper props
export interface PopupWrapperProps {
  isVisible: boolean;
  isExiting: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
}

// Confetti explosion props
export interface ConfettiExplosionProps {
  active: boolean;
}
