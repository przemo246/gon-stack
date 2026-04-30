import type { Registry } from './registry';
import type { Store } from './store';

export const createFacade = (store: Store, trigger: Registry['trigger']) => {
  return {
    init: (userId: string) => trigger('[TRIGGER]_GET_PROFILE', { userId }),
    useProfile: () => store.$profile.use(),
    useIsLoading: () => store.$isLoading.use(),
    useError: () => store.$error.use(),
  };
};
