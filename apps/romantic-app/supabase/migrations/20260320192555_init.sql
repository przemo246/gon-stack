create table if not exists public.profile_question_groups (
  id          bigint      generated always as identity primary key,
  key         text        not null unique,
  label       text        not null,
  description text        not null,
  sort_order  integer     not null unique,
  created_at  timestamptz not null default now()
);

alter table public.profile_question_groups enable row level security;

create policy "public read" on public.profile_question_groups
  for select using (true);

-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.profile_questions (
  id            bigint      generated always as identity primary key,
  group_id      bigint      not null references public.profile_question_groups(id) on delete restrict,
  key           text        not null unique,
  label         text        not null,
  question_type text        not null check (question_type in ('numeric', 'select', 'text', 'slide')),
  required      boolean     not null default true,
  min_value     integer,
  max_value     integer,
  default_value jsonb       not null,
  options       jsonb,
  scale_labels  jsonb,
  sort_order    integer     not null,
  created_at    timestamptz not null default now(),

  unique (group_id, sort_order),

  -- select: discrete options, no numeric range
  constraint chk_select check (
    question_type <> 'select'
    or (options is not null and scale_labels is null and min_value is null and max_value is null)
  ),
  -- numeric: range required, no options or scale labels
  constraint chk_numeric check (
    question_type <> 'numeric'
    or (min_value is not null and max_value is not null and options is null and scale_labels is null)
  ),
  -- slide: range + scale labels required, no options
  constraint chk_slide check (
    question_type <> 'slide'
    or (min_value is not null and max_value is not null and scale_labels is not null and options is null)
  ),
  -- text: no options or scale labels (min_value/max_value are optional length bounds)
  constraint chk_text check (
    question_type <> 'text'
    or (options is null and scale_labels is null)
  ),
  -- default must fall within declared range
  constraint chk_default_in_range check (
    min_value is null
    or max_value is null
    or (default_value >= to_jsonb(min_value) and default_value <= to_jsonb(max_value))
  )
);

alter table public.profile_questions enable row level security;

create policy "public read" on public.profile_questions
  for select using (true);

create index if not exists profile_questions_group_sort_idx
  on public.profile_questions (group_id, sort_order);
