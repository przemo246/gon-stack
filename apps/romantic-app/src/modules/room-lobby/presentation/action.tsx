import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';
import { useContext } from './context';

export const Action = () => {
  const ctx = useContext();

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="variant-pill">ROOM FLOW</div>
        <Heading level={4}>Room Action</Heading>
        <p className="b1">Create a private room or join with a partner code.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <Heading as="h3" level={6}>
            Create Room
          </Heading>
          <p className="b2">
            Start a new room and share your code with your partner.
          </p>
          <Button onClick={() => ctx.trigger('[TRIGGER]_GO_TO_CREATE')}>
            Create Room
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <Heading as="h3" level={6}>
            Join Room
          </Heading>
          <p className="b2">
            Enter a room code from your partner and join instantly.
          </p>
          <Button
            variant="secondary"
            onClick={() => ctx.trigger('[TRIGGER]_GO_TO_JOIN')}
          >
            Join Room
          </Button>
        </Card>
      </div>
    </div>
  );
};
