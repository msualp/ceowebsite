'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { FormState, FormAction, FormData } from '../types';
import { ERROR_MESSAGES } from '../constants';

// Initial form data
const initialFormData: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  aiExperience: '',
  aiInterest: '',
  userType: [],
  referralSource: '',
  otherReferral: ''
};

// Initial form state
const initialFormState: FormState = {
  formData: initialFormData,
  formError: '',
  currentStep: 1,
  isSubmitting: false
};

// Form reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        },
        formError: ''
      };
    case 'UPDATE_CHECKBOX':
      return {
        ...state,
        formData: {
          ...state.formData,
          userType: action.checked 
            ? [...state.formData.userType, action.field]
            : state.formData.userType.filter(type => type !== action.field)
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        formError: action.error
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
        formError: ''
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
        formError: ''
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    case 'RESET_FORM':
      return {
        ...initialFormState
      };
    default:
      return state;
  }
};

// Create context
interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  validateEmail: (email: string) => boolean;
  validateStep: () => boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the context provider
export const FormProvider = FormContext.Provider;

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
