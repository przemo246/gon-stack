import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const selectThread = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_SELECT_THREAD').pipe(
    tap(({ threadId }) => {
      store.$threads.set(
        store.$threads.get().map((t) => ({
          ...t,
          active: t.id === threadId,
          unread: t.id === threadId ? 0 : t.unread,
          state: t.id === threadId ? 'active' : t.state,
        })),
      );
      store.$selectedThreadId.set(threadId);
    }),
  );
