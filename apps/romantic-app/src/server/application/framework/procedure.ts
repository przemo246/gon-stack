import { Procedure } from '../models/procedure';

export const createProcedure = <TResponse = void>(
  procedure: Procedure<TResponse>,
): Procedure<TResponse> => {
  return async (context) => {
    try {
      return await procedure(context);
    } catch {
      throw new Error('Procedure failed');
    }
  };
};
