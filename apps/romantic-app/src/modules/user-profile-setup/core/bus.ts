import { eda } from '@/libs/eda';
import { Event } from '../contracts/events';

export const createBus = () => eda<Event>();

export type Bus = ReturnType<typeof createBus>;
