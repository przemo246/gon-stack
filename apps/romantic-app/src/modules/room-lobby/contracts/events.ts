import { type TriggerEvent } from '@/libs/eda';

export type Event =
  | TriggerEvent<'[TRIGGER]_INIT'>
  | TriggerEvent<'[TRIGGER]_GO_TO_CREATE'>
  | TriggerEvent<'[TRIGGER]_GO_TO_JOIN'>
  | TriggerEvent<'[TRIGGER]_BACK_TO_ACTION'>
  | TriggerEvent<'[TRIGGER]_UPDATE_JOIN_CODE', string>
  | TriggerEvent<'[TRIGGER]_CREATE_ROOM'>
  | TriggerEvent<'[TRIGGER]_JOIN_ROOM'>;
