import { AstroCookies } from 'astro';
import { supabase } from '../integration/supabase';
import { ProcedureContext } from '../models/procedure';

export const adapter = (context: {
  request: Request;
  cookies: AstroCookies;
}): ProcedureContext => {
  return {
    db: supabase({
      request: context.request,
      cookies: context.cookies,
    }),
  };
};
