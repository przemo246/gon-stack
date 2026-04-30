import type { User } from '@supabase/supabase-js';
import { Landing } from './landing';

type MainProps = {
  user: User | null;
};

export const Main = ({ user }: MainProps) => {
  return <Landing user={user} />;
};
