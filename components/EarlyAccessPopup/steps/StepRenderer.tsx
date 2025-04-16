import Step1 from './Step1_UserName';
import Step2 from './Step2_Email';
import Step3 from './Step3_RoleSelection';
import Step4 from './Step4_InterestTags';
import Step5 from './Step5_Thanks';

const StepRenderer = ({ step, ...props }) => {
  switch (step) {
    case 1: return <Step1 {...props} />;
    case 2: return <Step2 {...props} />;
    case 3: return <Step3 {...props} />;
    case 4: return <Step4 {...props} />;
    case 5: return <Step5 />;
    default: return null;
  }
};

export default StepRenderer;
