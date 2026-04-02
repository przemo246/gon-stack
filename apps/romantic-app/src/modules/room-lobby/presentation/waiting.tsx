import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';
import { ProgressIndicator } from '@/libs/ui/progress-indicator';
import { Spinner } from '@/libs/ui/spinner';
import { useContext } from './context';

export const Waiting = () => {
  const ctx = useContext();
  const roomCode = ctx.$roomCode.use();
  const presenceCount = ctx.$presenceCount.use();
  const waitingState = ctx.$waitingState.use();

  const waitingMessage =
    waitingState === 'partner_joined'
      ? 'Partner Joined. Preparing Next Step...'
      : waitingState === 'connection_retry'
        ? 'Connection Lost. Reconnecting...'
        : 'Waiting for Partner...';

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="variant-pill">WAITING ROOM</div>
        <Heading level={4}>Waiting for Partner</Heading>
        <p className="b1">
          Share the room code. This screen updates automatically.
        </p>
      </header>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Spinner variant="secondary" />
          <p className="b1">{waitingMessage}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="l1">Room Code</p>
          <p className="t5 tracking-wide">{roomCode ?? '------'}</p>
        </div>
        <p className="b2">{presenceCount} of 2 Participants Connected</p>
        <ProgressIndicator
          variant="secondary"
          value={presenceCount}
          max={2}
          size="sm"
        />
      </Card>

      <Alert
        variant={waitingState === 'partner_joined' ? 'success' : 'secondary'}
      >
        {waitingState === 'partner_joined'
          ? 'Both Players Ready Event'
          : 'Room Created or Joined Event'}
      </Alert>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => ctx.trigger('[TRIGGER]_BACK_TO_ACTION')}
        >
          Back to Room Action
        </Button>
      </div>
    </div>
  );
};
