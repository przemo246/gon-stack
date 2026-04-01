import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const prev = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_PREV').pipe(
    tap(() => {
      store.$activeStepIndex.set(Math.max(0, store.$activeStepIndex.get() - 1));
    }),
  );
