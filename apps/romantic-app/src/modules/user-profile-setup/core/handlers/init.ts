import { catchError, EMPTY, finalize, from, map, switchMap, tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';
import { getConfig } from '../../integration/repository';

export const init = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_INIT').pipe(
    tap(() => {
      store.$isIdle.set(false);
      store.$isLoading.set(true);
      store.$error.reset();
      store.$isStarted.reset();
      store.$isFinished.reset();
      store.$isSaving.reset();
      store.$isSaved.reset();
      store.$activeStepIndex.reset();
      store.$steps.reset();
    }),
    map(() => new AbortController()),
    switchMap((ctrl) =>
      from(getConfig(ctrl.signal)).pipe(
        tap((steps) => {
          store.$steps.set(steps);
        }),
        catchError((error) => {
          store.$error.set(
            error instanceof Error
              ? error.message
              : 'Failed to load profile setup configuration.',
          );
          return EMPTY;
        }),
        finalize(() => {
          store.$isLoading.reset();
          ctrl.abort();
        }),
      ),
    ),
  );
