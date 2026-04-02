import { useContext } from './context';
import { ErrorTemplate } from './error-template';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';

export const Welcome = () => {
  const ctx = useContext();
  const isLoading = ctx.$isLoading.use();
  const isIdle = ctx.$isIdle.use();
  const hasError = ctx.$hasError.use();
  const totalSteps = ctx.$totalSteps.use();
  const canStart = !isLoading && !isIdle && !hasError && totalSteps > 0;

  if (hasError) {
    return <ErrorTemplate />;
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <div className="variant-pill">PROFILE SETUP</div>
      </header>
      <Heading level={4}>Let&apos;s set up your relationship profile</Heading>
      <p className="b1">
        Takes about 3-5 minutes. Your answers stay private in your room.
      </p>
      <Card className="b2">
        We&apos;ll start with a few basics, then some quick questions about how
        you are in relationships. Ready?
      </Card>
      <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
        <Button
          disabled={!canStart}
          className="w-full md:w-auto"
          onClick={() => ctx.trigger('[TRIGGER]_START')}
        >
          Let&apos;s go
        </Button>
      </div>
    </div>
  );
};
