import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const removePosterHandler = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_REMOVE_POSTER').pipe(
    tap(() => {
      store.$posterUrl.reset();
      store.$posterStatus.reset();
      store.$posterError.reset();
    }),
  );
