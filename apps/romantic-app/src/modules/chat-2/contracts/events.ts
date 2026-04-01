import { type TriggerEvent } from '../../../libs/eda';

export type Event =
  | TriggerEvent<'[TRIGGER]_CHAT2_BOOTSTRAP'>
  | TriggerEvent<'[TRIGGER]_CHAT2_SELECT_THREAD', { threadId: string }>
  | TriggerEvent<'[TRIGGER]_CHAT2_UPDATE_DRAFT', { body: string }>
  | TriggerEvent<'[TRIGGER]_CHAT2_SEND_MESSAGE'>
  | TriggerEvent<'[TRIGGER]_CHAT2_RETRY_CONNECTION'>
  | TriggerEvent<'[TRIGGER]_CHAT2_UPDATE_SEARCH', { query: string }>;
