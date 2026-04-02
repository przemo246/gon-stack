import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const updateJoinCode = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_UPDATE_JOIN_CODE').pipe(
    tap((value) => {
      store.$joinCode.set(value.toUpperCase().slice(0, 6));
      if (store.$error.get()) {
        store.$error.reset();
        store.$status.set('idle');
      }
    }),
  );
