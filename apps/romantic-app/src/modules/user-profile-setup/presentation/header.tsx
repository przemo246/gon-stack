import { memo } from 'react';
import { ProgressBar } from '@/libs/ui/progress-bar';
import { useContext } from './context';

export const Header = memo(
  () => {
    const ctx = useContext();
    const activeStepIndex = ctx.$activeStepIndex.use();
    const totalSteps = ctx.$totalSteps.use();
    const activeStep = ctx.$activeStep.use();
    const progressPercentage = ctx.$progressPercentage.use();

    return (
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="variant-pill">PROFILE SETUP</div>
          <p className="l1">
            Step {activeStepIndex + 1} of {totalSteps} - {activeStep.label}
          </p>
        </div>
        <ProgressBar value={progressPercentage} max={100} />
      </header>
    );
  },
  () => true,
);

Header.displayName = 'Header';
