import { atom } from '@/libs/supa-store';
import type { RoomCode } from '../domain/models';

export const createStore = () => {
  const $roomCode = atom<RoomCode | null>(null);

  return {
    $roomCode,
  };
};

export type Store = ReturnType<typeof createStore>;
