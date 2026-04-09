import { Unauthorized } from '../../core/error-handling';
import type { Supabase } from '../../integration/supabase';

export const authenticate = async (db: Supabase): Promise<void> => {
  const userResult = await db.auth.getUser();

  if (userResult.error) throw new Unauthorized();

  const { user } = userResult.data;

  if (!user) throw new Unauthorized();
};
