insert into public.profile_question_groups (key, label, description, sort_order)
values
  ('basics',             'Basics',             'A few details so your partner knows who you are.',    1),
  ('communication',      'Communication',      'How you talk about problems and preferences.',         2),
  ('emotional-openness', 'Emotional openness', 'How you share feelings and vulnerabilities.',          3),
  ('initiative',         'Initiative',         'Who plans and starts romantic moments.',               4),
  ('playfulness',        'Playfulness',        'Teasing, humor, and keeping things light.',            5),
  ('planning',           'Planning',           'Weekends, spontaneity, and surprises.',                6),
  ('affection',          'Affection',          'Physical touch and PDA.',                              7),
  ('togetherness',       'Togetherness',       'Time together and alone time.',                        8),
  ('conflict',           'Conflict',           'How you handle disagreements.',                        9)
on conflict (key) do update set
  label       = excluded.label,
  description = excluded.description,
  sort_order  = excluded.sort_order;

-- ─────────────────────────────────────────────────────────────────────────────
-- CTE resolves group keys → identity-generated ids
-- conflict target is (key) — stable across re-seeds, no manual ids needed
-- ─────────────────────────────────────────────────────────────────────────────

with g as (
  select key, id from public.profile_question_groups
)
insert into public.profile_questions (
  group_id, key, label, question_type, required,
  min_value, max_value, default_value,
  options, scale_labels, sort_order
)
select
  g.id,
  q.key,
  q.label,
  q.question_type,
  q.required,
  q.min_value,
  q.max_value,
  q.default_value::jsonb,
  q.options::jsonb,
  q.scale_labels::jsonb,
  q.sort_order
from (values
  -- ── basics ──────────────────────────────────────────────────────────────────
  ('basics',             'display-name',             'What should we call you?',                                                            'text',    true,  2,    32,   '""',            null, null, 1),
  ('basics',             'age',                      'How old are you?',                                                                    'numeric', true,  18,   120,  '18',            null, null, 2),
  -- ── communication ───────────────────────────────────────────────────────────
  ('communication',      'bring-up-directly',        'When something bothers you, how likely are you to bring it up directly?',             'slide',   true,  1,    5,    '3',             null, '{"min":"I almost never bring it up","max":"I say it pretty directly"}', 1),
  ('communication',      'hints-over-talks',         'I prefer hints and vibes over direct talks about problems.',                          'slide',   true,  1,    5,    '3',             null, '{"min":"Strongly disagree","max":"Strongly agree"}', 2),
  -- ── emotional-openness ──────────────────────────────────────────────────────
  ('emotional-openness', 'share-fears',              'How comfortable are you sharing your fears and insecurities with a partner?',         'slide',   true,  1,    5,    '3',             null, '{"min":"Not comfortable","max":"Very comfortable"}', 1),
  ('emotional-openness', 'keep-feelings-private',    'I like to keep my deeper feelings to myself.',                                        'slide',   true,  1,    5,    '3',             null, '{"min":"Strongly disagree","max":"Strongly agree"}', 2),
  -- ── initiative ──────────────────────────────────────────────────────────────
  ('initiative',         'plans-romantic-activities','How often do you like to be the one who plans romantic activities?',                  'select',  true,  null, null, '"sometimes"',   '[{"value":"never","label":"Never"},{"value":"sometimes","label":"Sometimes"},{"value":"often","label":"Often"},{"value":"very-often","label":"Very often"}]', null, 1),
  ('initiative',         'starts-gestures',          'In an ideal relationship, who usually starts romantic gestures?',                     'select',  true,  null, null, '"take-turns"',  '[{"value":"mostly-partner","label":"Mostly my partner"},{"value":"take-turns","label":"We take turns"},{"value":"mostly-me","label":"Mostly me"}]', null, 2),
  -- ── playfulness ─────────────────────────────────────────────────────────────
  ('playfulness',        'teasing-importance',       'How important is playful teasing and jokes in your relationship?',                    'slide',   true,  1,    5,    '3',             null, '{"min":"Not important","max":"Very important"}', 1),
  ('playfulness',        'conflict-humor',           'In conflicts, I prefer to keep things light and defuse with humor.',                  'slide',   true,  1,    5,    '3',             null, '{"min":"Strongly disagree","max":"Strongly agree"}', 2),
  -- ── planning ────────────────────────────────────────────────────────────────
  ('planning',           'weekend-preference',       'On a free weekend, I prefer...',                                                      'select',  true,  null, null, '"mix"',         '[{"value":"planned","label":"Planned dates and activities"},{"value":"mix","label":"A mix of planned and spontaneous"},{"value":"spontaneous","label":"Mostly spontaneous decisions"}]', null, 1),
  ('planning',           'last-minute-surprises',    'Last-minute surprises make me feel...',                                               'select',  true,  null, null, '"neutral"',     '[{"value":"stressed","label":"Stressed"},{"value":"neutral","label":"Neutral"},{"value":"excited","label":"Excited"}]', null, 2),
  -- ── affection ───────────────────────────────────────────────────────────────
  ('affection',          'physical-private',         'How comfortable are you with physical affection (hugs, cuddles, kisses) in private?', 'slide',   true,  1,    5,    '3',             null, '{"min":"Not comfortable","max":"Very comfortable"}', 1),
  ('affection',          'pda',                      'Public displays of affection (PDA) are...',                                           'select',  true,  null, null, '"okay-small"',  '[{"value":"uncomfortable","label":"Uncomfortable"},{"value":"okay-small","label":"Okay in small doses"},{"value":"totally-fine","label":"Totally fine"},{"value":"enjoy","label":"I enjoy them a lot"}]', null, 2),
  -- ── togetherness ────────────────────────────────────────────────────────────
  ('togetherness',       'evenings-per-week',        'How many evenings per week do you ideally like to spend together?',                   'numeric', true,  0,    7,    '3',             null, null, 1),
  ('togetherness',       'alone-time',               'In a relationship, personal alone time is...',                                        'select',  true,  null, null, '"somewhat"',    '[{"value":"not-important","label":"Not important"},{"value":"somewhat","label":"Somewhat important"},{"value":"very","label":"Very important"}]', null, 2),
  -- ── conflict ────────────────────────────────────────────────────────────────
  ('conflict',           'approach',                 'When conflict appears, I tend to...',                                                 'select',  true,  null, null, '"wait-then-talk"','[{"value":"avoid","label":"Avoid and hope it passes"},{"value":"wait-then-talk","label":"Wait a bit, then talk"},{"value":"talk-directly","label":"Talk about it quickly and directly"}]', null, 1),
  ('conflict',           'raised-voices',            'Raised voices in arguments make me want to...',                                       'select',  true,  null, null, '"stay-tense"',  '[{"value":"shut-down","label":"Shut down"},{"value":"stay-tense","label":"Stay but feel tense"},{"value":"keep-talking","label":"Keep talking to resolve it"}]', null, 2)
) as q(group_key, key, label, question_type, required, min_value, max_value, default_value, options, scale_labels, sort_order)
join g on g.key = q.group_key
on conflict (key) do update set
  group_id      = excluded.group_id,
  label         = excluded.label,
  question_type = excluded.question_type,
  required      = excluded.required,
  min_value     = excluded.min_value,
  max_value     = excluded.max_value,
  default_value = excluded.default_value,
  options       = excluded.options,
  scale_labels  = excluded.scale_labels,
  sort_order    = excluded.sort_order;
