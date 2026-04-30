import type { TriggerEvent } from '@/libs/eda';

export type Event = TriggerEvent<'[TRIGGER]_GET_PROFILE', { userId: string }>;
