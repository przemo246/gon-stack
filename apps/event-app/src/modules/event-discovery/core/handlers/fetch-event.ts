import { catchError, EMPTY, finalize, from, switchMap, tap } from 'rxjs';
import { fetchEvent } from '../../integration/repository';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const fetchEventHandler = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_FETCH_EVENT').pipe(
    tap(() => {
      store.$isLoadingEvent.set(true);
      store.$eventError.reset();
    }),
    switchMap(({ id }) => {
      const ctrl = new AbortController();

      return from(fetchEvent(id, ctrl.signal)).pipe(
        tap((event) => store.$event.set(event)),
        catchError((error) => {
          if (error instanceof DOMException && error.name === 'AbortError')
            return EMPTY;
          store.$eventError.set(
            error instanceof Error ? error.message : 'Coś poszło nie tak.',
          );
          return EMPTY;
        }),
        finalize(() => {
          store.$isLoadingEvent.reset();
          ctrl.abort();
        }),
      );
    }),
  );
