import { eda } from '../../../libs/eda';
import { type Store } from './store';
import { Event } from '../contracts/events';
import { init } from '@/modules/user-profile-setup/core/handlers/init';
import { saveAnswers } from './handlers/save-answers';
import { start } from './handlers/start';
import { prev } from './handlers/prev';
import { next } from './handlers/next';
import { editAnswers } from './handlers/edit-answers';

export type OfType = ReturnType<typeof eda<Event>>['ofType'];

export const createRegistry = (store: Store) => {
  const { ofType, trigger, createRegistry } = eda<Event>();

  const registry = createRegistry(
    init(store, ofType),
    start(store, ofType),
    prev(store, ofType),
    next(store, ofType),
    saveAnswers(store, ofType),
    editAnswers(store, ofType),
  );

  return { trigger, registry };
};

export type Registry = ReturnType<typeof createRegistry>;
