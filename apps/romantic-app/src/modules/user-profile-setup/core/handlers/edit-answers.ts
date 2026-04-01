import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

export const editAnswers = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_EDIT_ANSWERS').pipe(
    tap(() => {
      store.$isFinished.reset();
      store.$isSaved.reset();
      store.$isSaving.reset();
      store.$activeStepIndex.reset();
    }),
  );
