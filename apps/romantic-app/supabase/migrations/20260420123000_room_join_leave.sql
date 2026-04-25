-- Defines room lifecycle states for matchmaking and game flow.
create type public.room_status as enum (
  'waiting',
  'ready',
  'active',
  'paused',
  'finished',
  'cancelled',
  'expired'
);

-- Stores room-level metadata and settings.
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  code varchar(6) not null unique
    check (code ~ '^[A-Z0-9]{6}$'),

  host_user_id uuid not null references auth.users(id),
  status public.room_status not null default 'waiting',

  min_players smallint not null default 2 check (min_players >= 2),
  max_players smallint not null default 2 check (max_players >= min_players),
  target_score smallint not null default 10 check (target_score > 0),

  expires_at timestamptz not null default (now() + interval '24 hours'),
  started_at timestamptz,
  ended_at timestamptz,

  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tracks membership and per-user room state.
create table public.room_participants (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  role text not null check (role in ('host', 'player')),
  is_ready boolean not null default false,
  score integer not null default 0,
  joined_at timestamptz not null default now(),
  left_at timestamptz,

  primary key (room_id, user_id)
);

-- Enable policy-driven access.
alter table public.rooms enable row level security;
alter table public.room_participants enable row level security;

-- Enforce RLS even when broader grants exist.
alter table public.rooms force row level security;
alter table public.room_participants force row level security;

-- Deny by default.
revoke all on public.rooms from public, anon, authenticated;
revoke all on public.room_participants from public, anon, authenticated;

-- Only backend service role can access room tables directly.
grant all on public.rooms to service_role;
grant all on public.room_participants to service_role;

-- RLS helpers avoid self-referencing policy recursion and keep policies readable.
create or replace function public.is_room_member(p_room_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.room_participants rp
    where rp.room_id = p_room_id
      and rp.user_id = (select auth.uid())
      and rp.left_at is null
  );
$$;

create or replace function public.is_room_host(p_room_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.rooms r
    where r.id = p_room_id
      and r.host_user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_room_member(uuid) from public;
revoke all on function public.is_room_host(uuid) from public;
grant execute on function public.is_room_member(uuid) to service_role;
grant execute on function public.is_room_host(uuid) to service_role;

-- Host can create room only for own user id.
create policy "rooms_insert_host_only"
on public.rooms
for insert
to authenticated
with check (host_user_id = (select auth.uid()));

-- Host and active members can read room.
create policy "rooms_select_host_or_member"
on public.rooms
for select
to authenticated
using (
  host_user_id = (select auth.uid())
  or (select public.is_room_member(id))
);

-- Only host can update/delete room.
create policy "rooms_update_host_only"
on public.rooms
for update
to authenticated
using ((select public.is_room_host(id)))
with check ((select public.is_room_host(id)));

create policy "rooms_delete_host_only"
on public.rooms
for delete
to authenticated
using ((select public.is_room_host(id)));

-- Room members can read participant rows for their room.
create policy "room_participants_select_for_members"
on public.room_participants
for select
to authenticated
using ((select public.is_room_member(room_id)));

-- User can join room only as self.
create policy "room_participants_insert_self"
on public.room_participants
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and role in ('host', 'player')
);

-- User can update/delete only own participant row (leave/ready state).
create policy "room_participants_update_self"
on public.room_participants
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "room_participants_delete_self"
on public.room_participants
for delete
to authenticated
using (user_id = (select auth.uid()));

-- Indexes supporting join/leave and RLS lookups.
create index rooms_host_user_id_idx
  on public.rooms (host_user_id);

create index rooms_status_idx
  on public.rooms (status);

create index rooms_expires_at_idx
  on public.rooms (expires_at);

create index room_participants_room_user_active_idx
  on public.room_participants (room_id, user_id)
  where left_at is null;

create index room_participants_user_room_active_idx
  on public.room_participants (user_id, room_id)
  where left_at is null;

create index room_participants_room_active_idx
  on public.room_participants (room_id)
  where left_at is null;

create unique index room_participants_one_active_host_per_room_uidx
  on public.room_participants (room_id)
  where role = 'host' and left_at is null;
