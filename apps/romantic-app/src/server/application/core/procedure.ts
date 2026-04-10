import { APIError, InternalServer } from './error-handling';
import { supabase, type Supabase } from '../integration/supabase';
import type { APIContext } from 'astro';

export type ProcedureSchema<TIn, TOut> = {
  parseInput: (input: unknown) => Promise<TIn>;
  parseOutput: (output: unknown) => Promise<TOut>;
};

export const createProcedure = <TIn, TOut>({
  schema,
}: {
  schema: ProcedureSchema<TIn, TOut>;
}) => {
  return ({
    handler,
  }: {
    handler: (input: TIn, extra: { db: Supabase }) => Promise<TOut>;
  }) => {
    return async (input: unknown, context: APIContext): Promise<TOut> => {
      try {
        const parsedInput = await schema.parseInput(input);
        const result = await handler(parsedInput, { db: supabase(context) });
        return await schema.parseOutput(result);
      } catch (error) {
        if (APIError.is(error)) {
          return error.json() as TOut;
        } else {
          return new InternalServer().json() as TOut;
        }
      }
    };
  };
};
