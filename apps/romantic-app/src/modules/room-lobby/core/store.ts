import { atom, computed } from '@/libs/supa-store';
import type {
  RoomLobbyScreen,
  RoomLobbyStatus,
  WaitingState,
} from '../contracts/models';

export const createStore = () => {
  const $screen = atom<RoomLobbyScreen>('action');
  const $status = atom<RoomLobbyStatus>('idle');
  const $error = atom<string | null>(null);
  const $joinCode = atom('');
  const $roomCode = atom<string | null>(null);
  const $presenceCount = atom(0);
  const $waitingState = atom<WaitingState>('waiting_for_partner');

  return {
    $screen,
    $status,
    $error,
    $joinCode,
    $roomCode,
    $presenceCount,
    $waitingState,
    $hasError: computed([$error], (error) => Boolean(error)),
    $isLoading: computed([$status], (status) => status === 'loading'),
    $canJoin: computed([$joinCode, $status], (joinCode, status) => {
      return joinCode.trim().length >= 6 && status !== 'loading';
    }),
  };
};

export type Store = ReturnType<typeof createStore>;
