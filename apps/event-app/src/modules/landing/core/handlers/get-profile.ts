import { catchError, EMPTY, finalize, from, switchMap, tap } from 'rxjs';
import { getProfile } from '../../integration/repository';
import type { Bus } from '../bus';
import type { Store } from '../store';

export const onGetProfile = (store: Store, { ofType }: Bus) =>
  ofType('[TRIGGER]_GET_PROFILE').pipe(
    tap(() => {
      store.$isLoading.set(true);
      store.$error.reset();
    }),
    switchMap(({ userId }) =>
      from(getProfile(userId)).pipe(
        tap((profile) => {
          store.$profile.set(profile);
        }),
        catchError((error) => {
          store.$error.set(
            error instanceof Error ? error.message : 'Failed to load profile.',
          );
          return EMPTY;
        }),
        finalize(() => {
          store.$isLoading.reset();
        }),
      ),
    ),
  );
