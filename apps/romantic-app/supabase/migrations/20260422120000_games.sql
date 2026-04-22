-- MVP scope note:
-- This migration adds gameplay session layer above rooms:
-- room (lobby) -> game (play session) -> game_participants (per-session score state).
-- It keeps same security model as room migration: deny-by-default + strict RLS.

-- Defines game lifecycle states inside room session.
create type public.game_status as enum (
  -- Created, waiting for first question/start action.
  'pending',
  -- Session currently running.
  'active',
  -- Session temporarily stopped, can resume later.
  'paused',
  -- Session ended with winner or normal completion.
  'finished',
  -- Session terminated early by host/system.
  'cancelled'
);

-- Stores game-level metadata tied to room.
create table public.games (
  -- Stable id for one gameplay session.
  id uuid primary key default gen_random_uuid(),
  -- Parent room relation; delete room => delete all child games.
  room_id uuid not null references public.rooms(id) on delete cascade,
  -- User who started/created game instance.
  created_by_user_id uuid not null references auth.users(id),
  -- Current lifecycle state used by UI and backend state machine.
  status public.game_status not null default 'pending',
  -- Win threshold for MVP (+/- scoring until one reaches target).
  target_score smallint not null default 10 check (target_score > 0),
  -- Winner snapshot; set null if referenced user removed.
  winner_user_id uuid references auth.users(id) on delete set null,
  -- Timing fields for metrics and resumed state.
  started_at timestamptz,
  ended_at timestamptz,
  -- Flexible game config (future knobs without migration churn).
  settings jsonb not null default '{}'::jsonb,
  -- Audit fields for debugging and analytics.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stores per-user game state and score.
create table public.game_participants (
  -- Parent game relation; cascade keeps no orphan participant rows.
  game_id uuid not null references public.games(id) on delete cascade,
  -- Player identity in this game.
  user_id uuid not null references auth.users(id),
  -- Running score for live scoreboard.
  score integer not null default 0,
  -- Membership lifecycle inside game.
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  -- Composite key: exactly one participant row per user per game.
  primary key (game_id, user_id)
);

-- Enable policy-driven access.
-- Authenticated users can interact only through RLS policies below.
alter table public.games enable row level security;
alter table public.game_participants enable row level security;

-- Enforce RLS even when broader grants exist.
alter table public.games force row level security;
alter table public.game_participants force row level security;

-- Deny by default.
revoke all on public.games from public, anon, authenticated;
revoke all on public.game_participants from public, anon, authenticated;

-- Only backend service role can access game tables directly.
-- Service role handles trusted orchestration tasks and moderation actions.
grant all on public.games to service_role;
grant all on public.game_participants to service_role;

-- RLS helper: true if caller is active member of room that owns game.
-- Used to gate reads and self-join actions.
create or replace function public.is_game_room_member(p_game_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.games g
    join public.room_participants rp
      on rp.room_id = g.room_id
    where g.id = p_game_id
      and rp.user_id = (select auth.uid())
      and rp.left_at is null
  );
$$;

-- RLS helper: true if caller is room host for game's room.
-- Used to gate game lifecycle mutations (start/pause/finish/cancel).
create or replace function public.is_game_host(p_game_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.games g
    where g.id = p_game_id
      and (select public.is_room_host(g.room_id))
  );
$$;

-- Keep helper functions private by default.
revoke all on function public.is_game_room_member(uuid) from public;
revoke all on function public.is_game_host(uuid) from public;
-- Service role keeps execute for backend flows.
grant execute on function public.is_game_room_member(uuid) to service_role;
grant execute on function public.is_game_host(uuid) to service_role;

-- Room host can create game in own room only.
-- Prevents impersonation by forcing creator id = auth.uid().
create policy "games_insert_host_only"
on public.games
for insert
to authenticated
with check (
  created_by_user_id = (select auth.uid())
  and (select public.is_room_host(room_id))
);

-- Room members can read games for rooms they are part of.
-- Supports status polling and scoreboard UI for all players.
create policy "games_select_member_only"
on public.games
for select
to authenticated
using ((select public.is_room_member(room_id)));

-- Room host can update/delete game rows.
-- Centralized control of game lifecycle transitions.
create policy "games_update_host_only"
on public.games
for update
to authenticated
using ((select public.is_game_host(id)))
with check ((select public.is_game_host(id)));

create policy "games_delete_host_only"
on public.games
for delete
to authenticated
using ((select public.is_game_host(id)));

-- Room members can read game participants in games they can access.
-- Needed for live roster + score rendering.
create policy "game_participants_select_for_members"
on public.game_participants
for select
to authenticated
using ((select public.is_game_room_member(game_id)));

-- User can join game only as self and only when member of game room.
-- Ensures caller cannot create row for another user.
create policy "game_participants_insert_self"
on public.game_participants
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and (select public.is_game_room_member(game_id))
);

-- User can update/delete only own game participant row.
-- Covers self-state changes like leaving/rejoining client-side.
create policy "game_participants_update_self"
on public.game_participants
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "game_participants_delete_self"
on public.game_participants
for delete
to authenticated
using (user_id = (select auth.uid()));

-- Indexes supporting common game + policy lookups.
-- Fast filter by room when loading room's sessions.
create index games_room_id_idx
  on public.games (room_id);

-- Fast filter by lifecycle state for lobby/game screens.
create index games_status_idx
  on public.games (status);

-- Fast combined lookup for room+state queries.
create index games_room_status_idx
  on public.games (room_id, status);

-- Fast active participant membership check for game+user.
create index game_participants_game_user_active_idx
  on public.game_participants (game_id, user_id)
  where left_at is null;

-- Fast user-centric active game lookup.
create index game_participants_user_game_active_idx
  on public.game_participants (user_id, game_id)
  where left_at is null;

-- Fast roster load for active players in game.
create index game_participants_game_active_idx
  on public.game_participants (game_id)
  where left_at is null;
