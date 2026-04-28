import type { TriggerEvent } from '@/libs/eda';
import type { RoomCode } from './models';

export type Event =
  | TriggerEvent<'[TRIGGER]_JOIN_ROOM', { roomCode: RoomCode }>
  | TriggerEvent<'[TRIGGER]_CREATE_ROOM'>;
