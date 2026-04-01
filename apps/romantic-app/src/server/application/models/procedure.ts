import { Supabase } from '../integration/supabase';

export type ProcedureContext = {
  db: Supabase;
};
export type Procedure<TResponse = void> = (context: {
  db: Supabase;
}) => Promise<TResponse>;
