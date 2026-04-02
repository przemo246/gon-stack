import { createRegistry } from './registry';
import { createStore } from './store';

export const createMediator = () => {
  const store = createStore();
  const { trigger, register } = createRegistry(store);

  return [store, trigger, register] as const;
};
