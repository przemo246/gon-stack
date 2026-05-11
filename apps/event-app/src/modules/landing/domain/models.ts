import type { Schema } from '@/shared/server-contracts/schemas/get-user-profile';
import type { InferOut } from '@/shared/server-contracts/extraction';

export type Profile = InferOut<Schema['out'], 200>['data'];
