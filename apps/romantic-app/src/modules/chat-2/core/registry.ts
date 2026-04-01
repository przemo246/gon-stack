import { eda } from '../../../libs/eda';
import { type Store } from './store';
import { type Event } from '../contracts/events';
import { bootstrap } from './handlers/bootstrap';
import { selectThread } from './handlers/select-thread';
import { updateDraft } from './handlers/update-draft';
import { sendMessage } from './handlers/send-message';
import { retryConnection } from './handlers/retry-connection';
import { updateSearch } from './handlers/update-search';

export type OfType = ReturnType<typeof eda<Event>>['ofType'];

export const createRegistry = (store: Store) => {
  const { ofType, trigger, createRegistry } = eda<Event>();

  const registry = createRegistry(
    bootstrap(store, ofType),
    selectThread(store, ofType),
    updateDraft(store, ofType),
    sendMessage(store, ofType),
    retryConnection(store, ofType),
    updateSearch(store, ofType),
  );

  return { trigger, registry };
};

export type Registry = ReturnType<typeof createRegistry>;
