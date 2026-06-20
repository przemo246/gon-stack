import { catchError, EMPTY, finalize, from, switchMap, tap } from 'rxjs';
import { searchLocations } from '../../integration/repository';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const searchLocationHandler = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_SEARCH_LOCATION').pipe(
    tap(() => {
      store.$geoStatus.set('loading');
      store.$geoResults.set([]);
    }),
    switchMap(({ query }) => {
      const ctrl = new AbortController();

      return from(searchLocations(query, ctrl.signal)).pipe(
        tap((results) => {
          store.$geoResults.set(results);
          store.$geoStatus.set(results.length ? 'success' : 'error');
        }),
        catchError((error) => {
          if (error instanceof DOMException && error.name === 'AbortError')
            return EMPTY;
          store.$geoStatus.set('error');
          return EMPTY;
        }),
        finalize(() => ctrl.abort()),
      );
    }),
  );
