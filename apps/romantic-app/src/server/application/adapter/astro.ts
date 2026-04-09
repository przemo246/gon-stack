import type { APIContext, APIRoute } from 'astro';
import { supabase } from '../integration/supabase';
import type {
  Procedure,
  ProcedureContext,
  RequestContract,
} from '../models/procedure';

type ProcedureResponse = { code: number };
type RedirectResponse = ProcedureResponse & { location: string };

const isRedirectResponse = (
  response: ProcedureResponse,
): response is RedirectResponse => {
  return (
    response.code >= 300 &&
    response.code < 400 &&
    'location' in response &&
    typeof response.location === 'string'
  );
};

const getPayload = async (request: Request): Promise<unknown> => {
  if (['GET', 'HEAD'].includes(request.method)) return undefined;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return await request.json();
  }

  if (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const formData = await request.formData();
    const payload: Record<string, string> = {};

    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    return payload;
  }

  return undefined;
};

export const astroAdapter =
  <TResponse extends ProcedureResponse, TRequest extends RequestContract>(
    procedure: Procedure<TResponse, TRequest>,
  ): APIRoute =>
  async (context: APIContext) => {
    const url = new URL(context.request.url);
    const payload = await getPayload(context.request);

    const procedureContext = {
      db: supabase({
        request: context.request,
        cookies: context.cookies,
      }),
      searchParams: Object.fromEntries(url.searchParams.entries()),
      pathParams: context.params,
      payload,
      headers: (() => {
        const headers: Record<string, string> = {};
        context.request.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return headers;
      })(),
    } as ProcedureContext<TRequest>;

    const response = await procedure(procedureContext);

    if (isRedirectResponse(response)) {
      return new Response(null, {
        status: response.code,
        headers: { Location: response.location },
      });
    }

    return new Response(JSON.stringify(response), {
      status: response.code,
      headers: { 'Content-Type': 'application/json' },
    });
  };
