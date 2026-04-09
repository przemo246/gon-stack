import type { Supabase } from '../integration/supabase';

export type RequestContract = {
  searchParams: Record<string, string | undefined>;
  pathParams: Record<string, string | undefined>;
  payload: unknown;
  headers: Record<string, string | undefined>;
};

export type ProcedureContext<
  TRequest extends RequestContract = RequestContract,
> = {
  db: Supabase;
  searchParams: TRequest['searchParams'];
  pathParams: TRequest['pathParams'];
  payload: TRequest['payload'];
  headers: TRequest['headers'];
};

export type Procedure<
  TResponse = void,
  TRequest extends RequestContract = RequestContract,
> = (context: ProcedureContext<TRequest>) => Promise<TResponse>;
