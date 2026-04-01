import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const updateSearch = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_CHAT2_UPDATE_SEARCH').pipe(
    tap(({ query }) => {
      store.$searchQuery.set(query);
    }),
  );
