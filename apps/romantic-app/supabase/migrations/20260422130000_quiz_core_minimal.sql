-- MVP scope note:
-- This migration models minimal quiz loop from MVP:
-- room -> game -> ordered questions -> simultaneous answers -> scoring in app/backend.
-- Single category only for now; category table can be added later without breaking this core.

-- Defines supported question answer formats for quiz gameplay.
create type public.quiz_question_type as enum (
  -- One answer from finite options list.
  'single_choice',
  -- Binary answer for fast compatibility checks.
  'yes_no',
  -- Numeric/range-like agreement score (for example 1-5).
  'scale',
  -- Free-form text answer for open questions.
  'text'
);

-- Defines difficulty for progression and timer/score tuning.
create type public.quiz_question_difficulty as enum (
  -- Light/intro questions.
  'easy',
  -- Medium-depth questions.
  'medium',
  -- Deeper/sensitive questions.
  'hard'
);

-- Defines lifecycle states for question instance inside game.
create type public.game_question_status as enum (
  -- Question scheduled in queue, not shown yet.
  'pending',
  -- Question currently visible, accepts answers.
  'open',
  -- Answer window closed; no more user edits.
  'closed',
  -- Backend/app already compared answers and scored result.
  'evaluated'
);

-- Stores reusable quiz questions for single base category MVP.
create table public.quiz_questions (
  -- Stable identifier referenced by game question instances.
  id uuid primary key default gen_random_uuid(),
  -- User-facing question text shown in quiz UI.
  prompt text not null check (length(trim(prompt)) > 0),
  -- Controls which UI input widget and validation logic to use.
  question_type public.quiz_question_type not null,
  -- Supports progressive flow from easier to harder prompts.
  difficulty public.quiz_question_difficulty not null default 'easy',
  -- Option payload for choice-like questions (array of labels/values).
  -- Kept jsonb for flexible MVP authoring without separate options table.
  options jsonb not null default '[]'::jsonb,
  -- Soft toggle to hide bad/outdated questions without deleting history links.
  is_active boolean not null default true,
  -- Audit timestamps for content ops.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stores concrete ordered question instances used in game.
create table public.game_questions (
  -- Identifier for one asked question occurrence in one game.
  id uuid primary key default gen_random_uuid(),
  -- Parent game. Cascade delete keeps no orphan question instances.
  game_id uuid not null references public.games(id) on delete cascade,
  -- Reference to reusable question definition.
  question_id uuid not null references public.quiz_questions(id),
  -- Strict order in game flow. Used by UI to load next question.
  ordinal integer not null check (ordinal > 0),
  -- Controls if answer submission currently allowed.
  status public.game_question_status not null default 'pending',
  -- Per-question timer window (MVP requires timed answers).
  time_limit_sec smallint not null default 30 check (time_limit_sec between 10 and 300),
  -- Lifecycle timing for analytics and timeout checks.
  opened_at timestamptz,
  closed_at timestamptz,
  -- Audit timestamps for queue edits/state transitions.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Prevent duplicate order slot inside same game.
  unique (game_id, ordinal)
);

-- Stores one answer per user per game question.
create table public.game_answers (
  -- Which concrete asked question this answer belongs to.
  game_question_id uuid not null references public.game_questions(id) on delete cascade,
  -- Who submitted answer.
  user_id uuid not null references auth.users(id),
  -- Human-readable answer payload for text/simple values.
  answer_text text,
  -- Structured payload for flexible types (selected option id, scale value, metadata).
  answer_json jsonb not null default '{}'::jsonb,
  -- Explicit timeout marker (0-point case in MVP scoring logic).
  is_timeout boolean not null default false,
  -- Explicit skip marker (also 0-point case).
  is_skipped boolean not null default false,
  -- Submission moment for deadline enforcement and ordering.
  submitted_at timestamptz,
  -- Audit timestamps for answer edits before close.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Exactly one active answer row per user per asked question.
  primary key (game_question_id, user_id)
);

-- Enable policy-driven access.
-- Same security model as room/game migrations:
-- authenticated users act through RLS; direct broad table grants stay denied.
alter table public.quiz_questions enable row level security;
alter table public.game_questions enable row level security;
alter table public.game_answers enable row level security;

-- Enforce RLS even when broader grants exist.
alter table public.quiz_questions force row level security;
alter table public.game_questions force row level security;
alter table public.game_answers force row level security;

-- Deny by default.
revoke all on public.quiz_questions from public, anon, authenticated;
revoke all on public.game_questions from public, anon, authenticated;
revoke all on public.game_answers from public, anon, authenticated;

-- Only backend service role can access quiz tables directly.
-- Backend can seed/update content and run scoring workflows.
grant all on public.quiz_questions to service_role;
grant all on public.game_questions to service_role;
grant all on public.game_answers to service_role;

-- Helper checks if question instance is open.
-- Used by answer policies so writes stop immediately when host closes question.
create or replace function public.is_game_question_open(p_game_question_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.game_questions gq
    where gq.id = p_game_question_id
      and gq.status = 'open'
  );
$$;

-- Helper checks if caller is host for game question's game.
-- Host manages question queue/status; members cannot reorder flow.
create or replace function public.is_game_question_host(p_game_question_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.game_questions gq
    where gq.id = p_game_question_id
      and (select public.is_game_host(gq.game_id))
  );
$$;

-- Helper checks if caller is member for game question's game.
-- Keeps read/answer access scoped to players actually in room/game.
create or replace function public.is_game_question_member(p_game_question_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.game_questions gq
    where gq.id = p_game_question_id
      and (select public.is_game_room_member(gq.game_id))
  );
$$;

-- Keep helper functions private by default.
revoke all on function public.is_game_question_open(uuid) from public;
revoke all on function public.is_game_question_host(uuid) from public;
revoke all on function public.is_game_question_member(uuid) from public;
-- Service role can still execute for trusted backend operations.
grant execute on function public.is_game_question_open(uuid) to service_role;
grant execute on function public.is_game_question_host(uuid) to service_role;
grant execute on function public.is_game_question_member(uuid) to service_role;

-- Authenticated users can read active quiz questions.
-- No direct write for clients; content management belongs to backend.
create policy "quiz_questions_select_authenticated"
on public.quiz_questions
for select
to authenticated
using (is_active = true);

-- Game members can read questions used by their games.
-- Supports simultaneous display for both players.
create policy "game_questions_select_for_members"
on public.game_questions
for select
to authenticated
using ((select public.is_game_room_member(game_id)));

-- Only host can manage game question queue.
-- Prevents race conditions where both players reorder/open questions.
create policy "game_questions_insert_host_only"
on public.game_questions
for insert
to authenticated
with check ((select public.is_game_host(game_id)));

create policy "game_questions_update_host_only"
on public.game_questions
for update
to authenticated
using ((select public.is_game_host(game_id)))
with check ((select public.is_game_host(game_id)));

create policy "game_questions_delete_host_only"
on public.game_questions
for delete
to authenticated
using ((select public.is_game_host(game_id)));

-- Members can read answers in their game questions.
-- Needed for reveal/comparison step after both submit.
create policy "game_answers_select_for_members"
on public.game_answers
for select
to authenticated
using ((select public.is_game_question_member(game_question_id)));

-- User can submit own answer only when question open.
-- Enforces MVP "timed answer window" at DB layer.
create policy "game_answers_insert_self_open_only"
on public.game_answers
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and (select public.is_game_question_member(game_question_id))
  and (select public.is_game_question_open(game_question_id))
);

-- User can edit own answer while question still open.
-- Allows answer correction before timer closes.
create policy "game_answers_update_self_open_only"
on public.game_answers
for update
to authenticated
using (
  user_id = (select auth.uid())
  and (select public.is_game_question_open(game_question_id))
)
with check (
  user_id = (select auth.uid())
  and (select public.is_game_question_open(game_question_id))
);

-- User can delete own answer while question still open.
-- Supports optional "clear answer" UI before deadline.
create policy "game_answers_delete_self_open_only"
on public.game_answers
for delete
to authenticated
using (
  user_id = (select auth.uid())
  and (select public.is_game_question_open(game_question_id))
);

-- Indexes supporting question feed and answer checks.
-- Active + difficulty for random pick/filter pipelines.
create index quiz_questions_is_active_difficulty_idx
  on public.quiz_questions (is_active, difficulty);

-- Fast lookup: current question state/order by game.
create index game_questions_game_status_ordinal_idx
  on public.game_questions (game_id, status, ordinal);

-- Fast join from asked instances back to reusable question definition.
create index game_questions_question_id_idx
  on public.game_questions (question_id);

-- Useful for user history and "latest submission" reads.
create index game_answers_user_submitted_idx
  on public.game_answers (user_id, submitted_at);

-- Fast path for evaluation worker comparing two players' answers.
create index game_answers_game_question_idx
  on public.game_answers (game_question_id);
