import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const start = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_START').pipe(
    tap(() => {
      store.$error.reset();
      store.$isStarted.set(true);
      store.$isFinished.reset();
      store.$isSaving.reset();
      store.$isSaved.reset();
      store.$activeStepIndex.reset();
    }),
  );
