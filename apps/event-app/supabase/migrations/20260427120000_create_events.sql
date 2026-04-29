create extension if not exists postgis with schema extensions;

-- Create the events table
create table public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users on delete cascade,
  name text not null,
  description text,
  address text,
  location extensions.geography(POINT, 4326),
  keywords text[],
  start_date timestamptz not null,
  end_date timestamptz,
  constraint events_end_after_start check (end_date is null or end_date > start_date)
);

alter table public.events enable row level security;

-- Events are publicly readable (browsable without login)
create policy "events_public_read"
  on public.events for select
  to anon, authenticated
  using (true);

-- Only authenticated users can create events (created_by must match the caller)
create policy "events_authenticated_insert"
  on public.events for insert
  to authenticated
  with check ((select auth.uid()) = created_by);

-- Only the creator can update their own events
create policy "events_creator_update"
  on public.events for update
  to authenticated
  using ((select auth.uid()) = created_by);

-- Only the creator can delete their own events
create policy "events_creator_delete"
  on public.events for delete
  to authenticated
  using ((select auth.uid()) = created_by);

-- B-tree index for date-range filtering and sorting
create index events_start_date_idx on public.events (start_date);

-- B-tree index on created_by for RLS policy evaluation
create index events_created_by_idx on public.events (created_by);

-- GiST index for geographic proximity queries (ST_DWithin, ST_Distance, etc.)
create index events_location_idx on public.events using gist (location);

-- GIN index for keyword array containment queries (keywords @> '{concert}')
create index events_keywords_idx on public.events using gin (keywords);
