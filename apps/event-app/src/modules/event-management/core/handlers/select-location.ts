import { tap } from 'rxjs';
import type { OfType } from '../registry';
import type { Store } from '../store';

// Commit a chosen location (from the search list or the map modal). Coordinates
// are the map invariant; the structured address fields are set form-side.
export const selectLocationHandler = (store: Store, ofType: OfType) =>
  ofType('[TRIGGER]_SELECT_LOCATION').pipe(
    tap(({ coordinates }) => {
      store.$coordinates.set(coordinates);
      store.$geoResults.set([]);
      store.$geoStatus.set('success');
    }),
  );
