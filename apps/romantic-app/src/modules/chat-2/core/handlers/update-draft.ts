import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const updateDraft = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_CHAT2_UPDATE_DRAFT').pipe(
    tap(({ body }) => {
      store.$draft.set(body);
    }),
  );
