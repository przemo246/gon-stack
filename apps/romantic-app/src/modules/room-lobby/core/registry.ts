import { onJoinRoom } from './handlers/join-room';
import { onCreateRoom } from './handlers/create-room';
import type { Store } from './store';
import { createBus } from './bus';

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    onJoinRoom(store, bus),
    onCreateRoom(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
