import { createBrowserClient } from '@supabase/ssr';
import { type Database } from './db-schema';

const supabase = createBrowserClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
