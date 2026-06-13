-- Returns whether the current authenticated user has the 'admin' role.
-- security definer so it can read profiles.role despite RLS restricting
-- selects to the user's own row.
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

-- rollback: drop function public.is_admin();
