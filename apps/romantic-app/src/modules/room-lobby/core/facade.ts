import type { RoomCode } from '../domain/models';
import type { Registry } from './registry';
import type { Store } from './store';

export const createFacade = (store: Store, trigger: Registry['trigger']) => {
  return {
    createRoom: () => trigger('[TRIGGER]_CREATE_ROOM'),
    joinRoom: (roomCode: RoomCode) =>
      trigger('[TRIGGER]_JOIN_ROOM', { roomCode }),
    useRoomCode: () => store.$roomCode.use(),
  };
};
