import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const goToCreate = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_GO_TO_CREATE').pipe(
    tap(() => {
      store.$screen.set('create');
      store.$status.set('idle');
      store.$error.reset();
      store.$roomCode.reset();
      store.$presenceCount.set(0);
      store.$waitingState.set('waiting_for_partner');
    }),
  );
