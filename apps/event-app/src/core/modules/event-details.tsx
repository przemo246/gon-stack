import { DetailsMain } from '@/modules/event-discovery/presentation/details-main';
import type { User } from '@supabase/supabase-js';

type ModuleProps = {
  id: string;
  user: User | null;
};

export const EventDetailsModule = ({ id, user }: ModuleProps) => {
  return <DetailsMain id={id} user={user} />;
};
