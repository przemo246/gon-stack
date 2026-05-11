import { eda } from '@/libs/eda';
import { onGetProfile } from './handlers/get-profile';
import { type Store } from './store';
import { type Event } from '../domain/events';

export type OfType = ReturnType<typeof eda<Event>>['ofType'];

export const createRegistry = (store: Store) => {
  const { ofType, trigger, createRegistry } = eda<Event>();

  const registry = createRegistry(onGetProfile(store, ofType));

  return { trigger, registry };
};

export type Registry = ReturnType<typeof createRegistry>;
