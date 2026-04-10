import { useContext } from './context';
import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Text } from '@/libs/ui/text';

export const ErrorTemplate = () => {
  const ctx = useContext();
  const error = ctx.useError();

  return (
    <div className="flex flex-col gap-5" role="alert" aria-live="assertive">
      <header className="flex items-center justify-between gap-3">
        <Text.V1>SETUP UNAVAILABLE</Text.V1>
        <Text.C2 className="text-error">Error</Text.C2>
      </header>
      <Text.T4>We couldn&apos;t load your profile setup</Text.T4>
      <Text.B1>
        There was a problem loading the configuration for this room.
      </Text.B1>
      <Alert variant="error">
        <Text.B2>{error}</Text.B2>
      </Alert>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="w-full md:w-auto"
          onClick={ctx.init}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};
