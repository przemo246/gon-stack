import { APIError, type AllErrors, InternalServer } from './error-handling';
import { type Procedure, type RequestContract } from '../models/procedure';

type AllErrorsJson = ReturnType<AllErrors['json']>;
type ResponsesUnion<TResponses extends Record<PropertyKey, unknown>> =
  TResponses[keyof TResponses];

type RouteContract = {
  request: RequestContract;
  responses: Record<number, { code: number }>;
};

export const createProcedure = <TContract extends RouteContract>(
  procedure: Procedure<
    ResponsesUnion<TContract['responses']> | AllErrorsJson,
    TContract['request']
  >,
): Procedure<ResponsesUnion<TContract['responses']>, TContract['request']> => {
  return async (context) => {
    try {
      return (await procedure(context)) as ResponsesUnion<
        TContract['responses']
      >;
    } catch (error) {
      if (APIError.is(error)) {
        return error.json() as ResponsesUnion<TContract['responses']>;
      } else {
        return new InternalServer().json() as ResponsesUnion<
          TContract['responses']
        >;
      }
    }
  };
};
