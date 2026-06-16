import { catchError, EMPTY, exhaustMap, from, tap } from 'rxjs';
import { uploadPoster } from '../../integration/repository';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const uploadPosterHandler = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_UPLOAD_POSTER').pipe(
    tap(() => {
      store.$posterStatus.set('uploading');
      store.$posterError.reset();
    }),
    exhaustMap(({ file }) =>
      from(uploadPoster(file)).pipe(
        tap((url) => {
          store.$posterUrl.set(url);
          store.$posterStatus.set('idle');
        }),
        catchError((error) => {
          store.$posterError.set(
            error instanceof Error
              ? error.message
              : 'Nie udało się przesłać pliku.',
          );
          store.$posterStatus.set('error');
          return EMPTY;
        }),
      ),
    ),
  );
