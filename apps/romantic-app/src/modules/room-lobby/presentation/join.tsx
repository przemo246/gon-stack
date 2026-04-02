import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Heading } from '@/libs/ui/heading';
import { Input } from '@/libs/ui/input';
import { Label } from '@/libs/ui/label';
import { Spinner } from '@/libs/ui/spinner';
import { useContext } from './context';

export const Join = () => {
  const ctx = useContext();
  const joinCode = ctx.$joinCode.use();
  const canJoin = ctx.$canJoin.use();
  const isLoading = ctx.$isLoading.use();
  const hasError = ctx.$hasError.use();
  const error = ctx.$error.use();

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="variant-pill variant-pill-secondary">JOIN FLOW</div>
        <Heading level={4}>Join Room</Heading>
        <p className="b1">
          Use your partner&apos;s room code to join the room.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <Label htmlFor="room-code" className="l1">
          Room Code
        </Label>
        <Input
          id="room-code"
          autoComplete="off"
          placeholder="AB12CD"
          value={joinCode}
          maxLength={6}
          onChange={(event) =>
            ctx.trigger('[TRIGGER]_UPDATE_JOIN_CODE', event.target.value)
          }
        />
      </div>

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between">
        <Button
          variant="secondary"
          onClick={() => ctx.trigger('[TRIGGER]_BACK_TO_ACTION')}
        >
          Back
        </Button>
        <Button
          disabled={!canJoin || isLoading}
          onClick={() => ctx.trigger('[TRIGGER]_JOIN_ROOM')}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" /> Joining Room...
            </span>
          ) : (
            'Join Room'
          )}
        </Button>
      </div>

      {hasError && error && <Alert variant="error">{error}</Alert>}
    </div>
  );
};
