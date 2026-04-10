import { memo } from 'react';
import { ProgressBar } from '@/libs/ui/progress-bar';
import { Text } from '@/libs/ui/text';
import { useContext } from './context';

export const Header = memo(
  () => {
    const ctx = useContext();
    const activeStepIndex = ctx.useActiveStepIndex();
    const totalSteps = ctx.useTotalSteps();
    const activeStep = ctx.useActiveStep();
    const progressPercentage = ctx.useProgressPercentage();

    return (
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Text.V1>PROFILE SETUP</Text.V1>
          <Text.L1>
            Step {activeStepIndex + 1} of {totalSteps} - {activeStep.label}
          </Text.L1>
        </div>
        <ProgressBar value={progressPercentage} max={100} />
      </header>
    );
  },
  () => true,
);

Header.displayName = 'Header';
