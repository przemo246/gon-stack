import { createBus } from './bus';
import { onGetProfile } from './handlers/get-profile';
import type { Store } from './store';

export const createRegistry = (store: Store) => {
  const bus = createBus();
  const register = bus.createRegistry(onGetProfile(store, bus));

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
