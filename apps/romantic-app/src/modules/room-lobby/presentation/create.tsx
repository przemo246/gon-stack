import { useEffect } from 'react';
import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Heading } from '@/libs/ui/heading';
import { Spinner } from '@/libs/ui/spinner';
import { useContext } from './context';

export const Create = () => {
  const ctx = useContext();
  const isLoading = ctx.$isLoading.use();
  const hasError = ctx.$hasError.use();
  const error = ctx.$error.use();

  useEffect(() => {
    ctx.trigger('[TRIGGER]_CREATE_ROOM');
  }, [ctx]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="variant-pill">CREATE FLOW</div>
        <Heading level={4}>Create Room</Heading>
        <p className="b1">Create a room and wait for your partner to join.</p>
      </header>

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between">
        <Button
          variant="secondary"
          onClick={() => ctx.trigger('[TRIGGER]_BACK_TO_ACTION')}
        >
          Back
        </Button>
        {hasError ? (
          <Button onClick={() => ctx.trigger('[TRIGGER]_CREATE_ROOM')}>
            Try Again
          </Button>
        ) : (
          <div className="inline-flex items-center gap-2 text-sm font-medium">
            <Spinner size="sm" />
            {isLoading ? 'Creating Room...' : 'Preparing Room...'}
          </div>
        )}
      </div>

      {hasError && error && <Alert variant="error">{error}</Alert>}
    </div>
  );
};
