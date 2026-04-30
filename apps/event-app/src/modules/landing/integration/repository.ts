import { supabaseBrowser } from '@/shared/data-sources/supabase-browser';
import type { Profile } from '../domain/models';

export const getProfile = async (userId: string): Promise<Profile> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabaseBrowser as any;

  const { data, error } = await client
    .from('profiles')
    .select('avatar_url, username')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data as Profile;
};
