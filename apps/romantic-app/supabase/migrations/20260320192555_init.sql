create type public.question_type as enum ('numeric', 'select', 'text', 'slide');

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

alter table public.profile_questions enable row level security;
alter table public.profile_questions force row level security;

revoke all on public.profile_questions from public, anon, authenticated;
grant select on public.profile_questions to service_role;

create index profile_questions_group_key_idx on public.profile_questions (group_key);
