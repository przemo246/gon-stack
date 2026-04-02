import { catchError, EMPTY, exhaustMap, finalize, from, tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';
import { joinRoom, waitForPartner } from '../../integration/repository';

export const onJoinRoom = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_JOIN_ROOM').pipe(
    tap(() => {
      store.$status.set('loading');
      store.$error.reset();
      store.$roomCode.reset();
      store.$presenceCount.set(0);
      store.$waitingState.set('waiting_for_partner');
    }),
    exhaustMap(() => {
      const ctrl = new AbortController();
      const joinCode = store.$joinCode.get().trim().toUpperCase();

      return from(joinRoom(joinCode, ctrl.signal)).pipe(
        tap((code) => {
          store.$roomCode.set(code);
          store.$screen.set('waiting');
          store.$status.set('success');
          store.$presenceCount.set(1);
          store.$waitingState.set('waiting_for_partner');

          void waitForPartner().then(() => {
            store.$presenceCount.set(2);
            store.$waitingState.set('partner_joined');
          });
        }),
        catchError((error) => {
          store.$status.set('error');
          store.$error.set(
            error instanceof Error
              ? error.message
              : 'Room Is Not Available. Create a New Room or Use Another Code.',
          );
          return EMPTY;
        }),
        finalize(() => {
          if (store.$status.get() === 'loading') {
            store.$status.set('idle');
          }
          ctrl.abort();
        }),
      );
    }),
  );
