CREATE EXTENSION IF NOT EXISTS postgis;

-- Assumption: admin role is propagated as user_role = 'admin' in the JWT via a Supabase custom claims hook
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT coalesce((auth.jwt() ->> 'user_role'), '') = 'admin'
$$;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Rollback:
-- DROP FUNCTION IF EXISTS set_updated_at();
-- DROP FUNCTION IF EXISTS is_admin();
-- DROP EXTENSION IF EXISTS postgis;
