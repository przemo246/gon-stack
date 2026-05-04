-- Enumerates supported input types for profile questions.
create type public.question_type as enum ('numeric', 'select', 'text', 'slide');

-- Stores the full questionnaire configuration shown in profile setup.
create table public.profile_questions (
  id                  bigint generated always as identity primary key,
  group_key           text not null,
  group_label         text not null,
  group_description   text not null,
  key                 text not null unique,
  label               text not null,
  question_type       public.question_type not null,
  required            boolean not null default true,
  min_value           integer,
  max_value           integer,
  default_numeric     integer,
  default_text        text,
  badge_min           text,
  badge_max           text,
  select_options      jsonb,
  created_at          timestamptz not null default now()
);

-- Turn on row-level security so access is policy-driven.
alter table public.profile_questions enable row level security;
-- Enforce RLS even when table-level grants exist.
alter table public.profile_questions force row level security;

-- Start from deny-by-default for public and user-facing roles.
revoke all on public.profile_questions from public, anon, authenticated;
-- Allow read-only access for signed-in users and trusted backend role.
grant select on public.profile_questions to authenticated, service_role;

-- Permit authenticated users to read all profile question rows.
create policy "authenticated_can_read_profile_questions"
on public.profile_questions
for select
to authenticated
using (true);

-- Speeds up grouping/filtering by question group key.
create index profile_questions_group_key_idx on public.profile_questions (group_key);
