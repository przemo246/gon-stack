import { createProcedure } from '../../framework/procedure';

export const procedure = createProcedure<{ id: number }[]>(async ({ db }) => {
  // TODO: load questions from Supabase using _db

  return [
    {
      id: 1,
    },
  ];
});
