import type { Profile } from '../domain/models';
import { supabaseBrowser } from '@/shared/data-sources/supabase-browser';

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabaseBrowser
    .from('profiles')
    .select('id, avatar_url, username, role, created_at')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data as Profile;
};
