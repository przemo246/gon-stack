import { useContext } from './context';
import { ErrorTemplate } from './error-template';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Text } from '@/libs/ui/text';

export const Welcome = () => {
  const ctx = useContext();
  const isLoading = ctx.useIsLoading();
  const isIdle = ctx.useIsIdle();
  const hasError = ctx.useHasError();
  const totalSteps = ctx.useTotalSteps();
  const canStart = !isLoading && !isIdle && !hasError && totalSteps > 0;

  if (hasError) {
    return <ErrorTemplate />;
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <div className="variant-pill">PROFILE SETUP</div>
      </header>
      <Text.T4>Let&apos;s set up your relationship profile</Text.T4>
      <Text.B1>
        Takes about 3-5 minutes. Your answers stay private in your room.
      </Text.B1>
      <Card>
        <Text.B2>
          We&apos;ll start with a few basics, then some quick questions about how
          you are in relationships. Ready?
        </Text.B2>
      </Card>
      <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
        <Button
          disabled={!canStart}
          className="w-full md:w-auto"
          onClick={ctx.start}
        >
          Let&apos;s go
        </Button>
      </div>
    </div>
  );
};
