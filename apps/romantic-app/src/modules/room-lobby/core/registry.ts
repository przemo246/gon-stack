import { eda } from '@/libs/eda';
import { type Event } from '../contracts/events';
import { backToAction } from './handlers/back-to-action';
import { onCreateRoom } from './handlers/create-room';
import { goToCreate } from './handlers/go-to-create';
import { goToJoin } from './handlers/go-to-join';
import { init } from '@/modules/room-lobby/core/handlers/init';
import { onJoinRoom } from './handlers/join-room';
import { updateJoinCode } from './handlers/update-join-code';
import { type Store } from './store';

export type OfType = ReturnType<typeof eda<Event>>['ofType'];

export const createRegistry = (store: Store) => {
  const { ofType, trigger, createRegistry } = eda<Event>();

  const registry = createRegistry(
    init(store, ofType),
    goToCreate(store, ofType),
    goToJoin(store, ofType),
    backToAction(store, ofType),
    updateJoinCode(store, ofType),
    onCreateRoom(store, ofType),
    onJoinRoom(store, ofType),
  );

  return { trigger, registry };
};
