-- Junction table: tracks which users are participating in which events
create table public.event_participants (
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

alter table public.event_participants enable row level security;

-- Anyone can see who is participating in an event
create policy "event_participants_public_read"
  on public.event_participants for select
  to anon, authenticated
  using (true);

-- Authenticated users can join events (only as themselves)
create policy "event_participants_self_insert"
  on public.event_participants for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- Authenticated users can leave events (only their own participation)
create policy "event_participants_self_delete"
  on public.event_participants for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Index for "which events is this user attending?" (profile page, RLS evaluation)
create index event_participants_user_id_idx on public.event_participants (user_id);
