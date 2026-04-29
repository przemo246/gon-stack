import { exhaustMap, from, tap } from 'rxjs';
import { joinRoom } from '../../integration/repository';
import type { Bus } from '../bus';
import type { Store } from '../store';

export const onJoinRoom = (store: Store, { ofType }: Bus) =>
  ofType('[TRIGGER]_JOIN_ROOM').pipe(
    exhaustMap((payload) => {
      return from(joinRoom(payload.roomCode)).pipe(
        tap(() => {
          store.$roomCode.set(payload.roomCode);
        }),
      );
    }),
  );
