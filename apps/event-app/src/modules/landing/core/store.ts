import { atom } from '@/libs/supa-store';
import type { Profile } from '../domain/models';

export const createStore = () => {
  const $profile = atom<Profile | null>(null);
  const $isLoading = atom(false);
  const $error = atom<string | null>(null);

  return { $profile, $isLoading, $error };
};

export type Store = ReturnType<typeof createStore>;
