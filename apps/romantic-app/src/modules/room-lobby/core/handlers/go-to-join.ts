import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const goToJoin = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_GO_TO_JOIN').pipe(
    tap(() => {
      store.$screen.set('join');
      store.$status.set('idle');
      store.$error.reset();
      store.$roomCode.reset();
      store.$presenceCount.set(0);
      store.$waitingState.set('waiting_for_partner');
    }),
  );
