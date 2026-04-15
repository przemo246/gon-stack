import { Unauthorized } from '../../core/error-handling';
import type { SupabaseServer } from '@/shared/data-sources/supabase-server';

export const authenticate = async (db: SupabaseServer): Promise<void> => {
  const userResult = await db.auth.getUser();

  if (userResult.error) throw new Unauthorized();

  const { user } = userResult.data;

  if (!user) throw new Unauthorized();
};
