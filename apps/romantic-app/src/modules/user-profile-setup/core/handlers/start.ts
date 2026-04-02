import { tap } from 'rxjs';
import type { Store } from '../store';
import { Bus } from '../bus';

export const start = (store: Store, { ofType }: Bus) =>
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
