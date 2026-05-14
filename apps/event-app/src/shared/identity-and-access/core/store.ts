import { atom } from '@/libs/supa-store';
import type { UserProfile } from '../domain/models';

export const createStore = () => {
  const $userProfile = atom<UserProfile | null>(null);
  const $isLoading = atom(false);
  const $error = atom<string | null>(null);

  return { $userProfile, $isLoading, $error };
};

export type Store = ReturnType<typeof createStore>;
