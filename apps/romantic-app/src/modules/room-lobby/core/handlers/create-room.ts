import { exhaustMap, from, tap } from 'rxjs';
import { createRoom } from '../../integration/repository';
import type { RoomCode } from '../../domain/models';
import type { Bus } from '../bus';
import type { Store } from '../store';

export const onCreateRoom = (store: Store, { ofType }: Bus) =>
  ofType('[TRIGGER]_CREATE_ROOM').pipe(
    exhaustMap(() => {
      return from(createRoom()).pipe(
        tap((response) => {
          store.$roomCode.set(response.roomCode as RoomCode);
        }),
      );
    }),
  );
