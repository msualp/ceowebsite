import { useReducer } from 'react';

const initialState = {
  step: 1,
  formData: { firstName: '', lastName: '', email: '', role: '', interests: [] },
  formError: false,
  isSubmitting: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT': return { ...state, step: state.step + 1 };
    case 'BACK': return { ...state, step: state.step - 1 };
    case 'CHANGE': return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'ERROR': return { ...state, formError: true };
    case 'SUBMIT': return { ...state, isSubmitting: true };
    case 'RESET': return initialState;
    default: return state;
  }
}

export const useFormReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => dispatch({ type: 'CHANGE', payload: { [e.target.name]: e.target.value } });
  const handleSelect = (key, value) => dispatch({ type: 'CHANGE', payload: { [key]: value } });
  const handleNext = () => dispatch({ type: 'NEXT' });
  const handleBack = () => dispatch({ type: 'BACK' });
  const handleSubmit = () => dispatch({ type: 'SUBMIT' });

  const progress = (state.step - 1) * 25;
  const canProceed = Object.values(state.formData).slice(0, state.step).every(Boolean);

  return {
    state, progress, handleChange, handleSelect, handleNext, handleBack, handleSubmit, canProceed, isSubmitting: state.isSubmitting
  };
};
