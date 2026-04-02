import { useContext } from './context';
import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Heading } from '@/libs/ui/heading';

export const ErrorTemplate = () => {
  const ctx = useContext();
  const error = ctx.$error.use();

  return (
    <div className="flex flex-col gap-5" role="alert" aria-live="assertive">
      <header className="flex items-center justify-between gap-3">
        <div className="variant-pill">SETUP UNAVAILABLE</div>
        <span className="c2 text-error">Error</span>
      </header>
      <Heading level={4}>We couldn&apos;t load your profile setup</Heading>
      <p className="b1">
        There was a problem loading the configuration for this room.
      </p>
      <Alert variant="error" className="b2">
        {error}
      </Alert>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="w-full md:w-auto"
          onClick={() => ctx.trigger('[TRIGGER]_INIT')}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};
