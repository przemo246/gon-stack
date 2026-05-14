import type { InferOut } from '@/shared/server-contracts/extraction';
import type { Schema } from '@schemas/get-user-profile';
import type { SupabaseServer } from '@/shared/data-sources/supabase-server';
import { InternalServer } from '../../core/error-handling';

export const getProfile = async (
  userId: string,
  db: SupabaseServer,
): Promise<InferOut<Schema['out'], 200>['data']> => {
  const result = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (result.error) {
    throw new InternalServer('Failed to fetch user profile');
  }

  return result.data;
};
