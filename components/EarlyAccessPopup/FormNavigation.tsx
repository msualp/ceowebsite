const FormNavigation = ({ step, onNext, onBack, canProceed, isSubmitting, onSubmit }) => (
  <div className="mt-6 flex justify-between">
    {step > 1 ? (
      <button className="btn-secondary" onClick={onBack}>Back</button>
    ) : <div />}
    {step < 5 ? (
      <button className="btn-primary" onClick={onNext} disabled={!canProceed || isSubmitting}>
        Next
      </button>
    ) : (
      <button className="btn-primary" onClick={onSubmit} disabled={isSubmitting}>
        Submit
      </button>
    )}
  </div>
);

export default FormNavigation;
