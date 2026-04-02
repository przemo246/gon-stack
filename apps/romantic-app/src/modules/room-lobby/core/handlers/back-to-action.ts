import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const backToAction = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_BACK_TO_ACTION').pipe(
    tap(() => {
      store.$screen.set('action');
      store.$status.set('idle');
      store.$error.reset();
      store.$joinCode.reset();
      store.$roomCode.reset();
      store.$presenceCount.set(0);
      store.$waitingState.set('waiting_for_partner');
    }),
  );
