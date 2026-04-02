import type { APIContext, APIRoute } from 'astro';
import { supabase } from '../integration/supabase';
import type {
  Procedure,
  ProcedureContext,
  RequestContract,
} from '../models/procedure';

type ProcedureResponse = { code: number };

export const astroAdapter =
  <TResponse extends ProcedureResponse, TRequest extends RequestContract>(
    procedure: Procedure<TResponse, TRequest>,
  ): APIRoute =>
  async (context: APIContext) => {
    const url = new URL(context.request.url);

    let payload: unknown = undefined;
    if (!['GET', 'HEAD'].includes(context.request.method)) {
      try {
        payload = await context.request.json();
      } catch {
        payload = undefined;
      }
    }

    const procedureContext = {
      db: supabase({
        request: context.request,
        cookies: context.cookies,
      }),
      searchParams: Object.fromEntries(url.searchParams.entries()),
      pathParams: context.params,
      payload,
      headers: {},
    } as ProcedureContext<TRequest>;

    const response = await procedure(procedureContext);

    return new Response(JSON.stringify(response), {
      status: response.code,
      headers: { 'Content-Type': 'application/json' },
    });
  };
