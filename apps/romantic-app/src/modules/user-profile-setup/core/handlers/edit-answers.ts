import { tap } from 'rxjs';
import type { Bus } from '../bus';
import type { Store } from '../store';

export const editAnswers = (store: Store, { ofType }: Bus) =>
  ofType('[TRIGGER]_EDIT_ANSWERS').pipe(
    tap(() => {
      store.$isFinished.reset();
      store.$isSaved.reset();
      store.$isSaving.reset();
      store.$activeStepIndex.reset();
    }),
  );
