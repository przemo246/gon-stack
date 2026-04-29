insert into public.profile_questions (
  group_key, group_label, group_description,
  key, label, question_type, required,
  min_value, max_value, default_numeric, default_text, badge_min, badge_max,
  select_options
)
values
  ('basics', 'Basics', 'A few details so your partner knows who you are.',
   'display-name', 'What should we call you?', 'text', true,
   2, 32, null, '', null, null, null),
  ('basics', 'Basics', 'A few details so your partner knows who you are.',
   'age', 'How old are you?', 'numeric', true,
   18, 120, 18, null, null, null, null),

  ('communication', 'Communication', 'How you talk about problems and preferences.',
   'bring-up-directly', 'When something bothers you, how likely are you to bring it up directly?', 'slide', true,
   1, 5, 3, null, 'I almost never bring it up', 'I say it pretty directly', null),
  ('communication', 'Communication', 'How you talk about problems and preferences.',
   'hints-over-talks', 'I prefer hints and vibes over direct talks about problems.', 'slide', true,
   1, 5, 3, null, 'Strongly disagree', 'Strongly agree', null),

  ('emotional-openness', 'Emotional openness', 'How you share feelings and vulnerabilities.',
   'share-fears', 'How comfortable are you sharing your fears and insecurities with a partner?', 'slide', true,
   1, 5, 3, null, 'Not comfortable', 'Very comfortable', null),
  ('emotional-openness', 'Emotional openness', 'How you share feelings and vulnerabilities.',
   'keep-feelings-private', 'I like to keep my deeper feelings to myself.', 'slide', true,
   1, 5, 3, null, 'Strongly disagree', 'Strongly agree', null),

  ('initiative', 'Initiative', 'Who plans and starts romantic moments.',
   'plans-romantic-activities', 'How often do you like to be the one who plans romantic activities?', 'select', true,
   null, null, null, 'sometimes', null, null,
   '[{"value":"never","label":"Never"},{"value":"sometimes","label":"Sometimes"},{"value":"often","label":"Often"},{"value":"very-often","label":"Very often"}]'::jsonb),
  ('initiative', 'Initiative', 'Who plans and starts romantic moments.',
   'starts-gestures', 'In an ideal relationship, who usually starts romantic gestures?', 'select', true,
   null, null, null, 'take-turns', null, null,
   '[{"value":"mostly-partner","label":"Mostly my partner"},{"value":"take-turns","label":"We take turns"},{"value":"mostly-me","label":"Mostly me"}]'::jsonb),

  ('playfulness', 'Playfulness', 'Teasing, humor, and keeping things light.',
   'teasing-importance', 'How important is playful teasing and jokes in your relationship?', 'slide', true,
   1, 5, 3, null, 'Not important', 'Very important', null),
  ('playfulness', 'Playfulness', 'Teasing, humor, and keeping things light.',
   'conflict-humor', 'In conflicts, I prefer to keep things light and defuse with humor.', 'slide', true,
   1, 5, 3, null, 'Strongly disagree', 'Strongly agree', null),

  ('planning', 'Planning', 'Weekends, spontaneity, and surprises.',
   'weekend-preference', 'On a free weekend, I prefer...', 'select', true,
   null, null, null, 'mix', null, null,
   '[{"value":"planned","label":"Planned dates and activities"},{"value":"mix","label":"A mix of planned and spontaneous"},{"value":"spontaneous","label":"Mostly spontaneous decisions"}]'::jsonb),
  ('planning', 'Planning', 'Weekends, spontaneity, and surprises.',
   'last-minute-surprises', 'Last-minute surprises make me feel...', 'select', true,
   null, null, null, 'neutral', null, null,
   '[{"value":"stressed","label":"Stressed"},{"value":"neutral","label":"Neutral"},{"value":"excited","label":"Excited"}]'::jsonb),

  ('affection', 'Affection', 'Physical touch and PDA.',
   'physical-private', 'How comfortable are you with physical affection (hugs, cuddles, kisses) in private?', 'slide', true,
   1, 5, 3, null, 'Not comfortable', 'Very comfortable', null),
  ('affection', 'Affection', 'Physical touch and PDA.',
   'pda', 'Public displays of affection (PDA) are...', 'select', true,
   null, null, null, 'okay-small', null, null,
   '[{"value":"uncomfortable","label":"Uncomfortable"},{"value":"okay-small","label":"Okay in small doses"},{"value":"totally-fine","label":"Totally fine"},{"value":"enjoy","label":"I enjoy them a lot"}]'::jsonb),

  ('togetherness', 'Togetherness', 'Time together and alone time.',
   'evenings-per-week', 'How many evenings per week do you ideally like to spend together?', 'numeric', true,
   0, 7, 3, null, null, null, null),
  ('togetherness', 'Togetherness', 'Time together and alone time.',
   'alone-time', 'In a relationship, personal alone time is...', 'select', true,
   null, null, null, 'somewhat', null, null,
   '[{"value":"not-important","label":"Not important"},{"value":"somewhat","label":"Somewhat important"},{"value":"very","label":"Very important"}]'::jsonb),

  ('conflict', 'Conflict', 'How you handle disagreements.',
   'approach', 'When conflict appears, I tend to...', 'select', true,
   null, null, null, 'wait-then-talk', null, null,
   '[{"value":"avoid","label":"Avoid and hope it passes"},{"value":"wait-then-talk","label":"Wait a bit, then talk"},{"value":"talk-directly","label":"Talk about it quickly and directly"}]'::jsonb),
  ('conflict', 'Conflict', 'How you handle disagreements.',
   'raised-voices', 'Raised voices in arguments make me want to...', 'select', true,
   null, null, null, 'stay-tense', null, null,
   '[{"value":"shut-down","label":"Shut down"},{"value":"stay-tense","label":"Stay but feel tense"},{"value":"keep-talking","label":"Keep talking to resolve it"}]'::jsonb)
on conflict (key) do update set
  group_key           = excluded.group_key,
  group_label         = excluded.group_label,
  group_description   = excluded.group_description,
  label               = excluded.label,
  question_type       = excluded.question_type,
  required            = excluded.required,
  min_value           = excluded.min_value,
  max_value           = excluded.max_value,
  default_numeric     = excluded.default_numeric,
  default_text        = excluded.default_text,
  badge_min           = excluded.badge_min,
  badge_max           = excluded.badge_max,
  select_options      = excluded.select_options;

insert into public.quiz_questions (prompt, question_type, difficulty, options)
select seed.prompt, seed.question_type::public.quiz_question_type, seed.difficulty::public.quiz_question_difficulty, seed.options::jsonb
from (
  values
    -- Communication (10)
    ('[Communication] How often should partners check in about their day?', 'single_choice', 'easy', '[{"value":"daily","label":"Daily"},{"value":"few-times-week","label":"A few times a week"},{"value":"when-needed","label":"Only when needed"},{"value":"rarely","label":"Rarely"}]'),
    ('[Communication] I prefer direct feedback over subtle hints.', 'yes_no', 'easy', '[]'),
    ('[Communication] How comfortable are you discussing difficult topics calmly?', 'scale', 'medium', '[]'),
    ('[Communication] What is your ideal way to resolve misunderstandings?', 'text', 'medium', '[]'),
    ('[Communication] During conflict, should we take a short pause before talking?', 'yes_no', 'easy', '[]'),
    ('[Communication] Which style feels best in tense moments?', 'single_choice', 'medium', '[{"value":"gentle","label":"Gentle and soft"},{"value":"direct","label":"Direct and clear"},{"value":"structured","label":"Step-by-step structured"},{"value":"space-first","label":"Take space first"}]'),
    ('[Communication] How important is quick reply consistency for you?', 'scale', 'easy', '[]'),
    ('[Communication] What phrase helps you feel heard in arguments?', 'text', 'hard', '[]'),
    ('[Communication] Should partners share concerns before they become resentment?', 'yes_no', 'medium', '[]'),
    ('[Communication] Which channel feels most intimate for important talks?', 'single_choice', 'easy', '[{"value":"in-person","label":"In person"},{"value":"voice","label":"Voice call"},{"value":"video","label":"Video call"},{"value":"long-text","label":"Long text message"}]'),

    -- Emotional Openness (10)
    ('[Emotional Openness] How easy is it for you to admit vulnerability?', 'scale', 'medium', '[]'),
    ('[Emotional Openness] I share fears only after strong trust is built.', 'yes_no', 'easy', '[]'),
    ('[Emotional Openness] What helps you open up emotionally faster?', 'text', 'medium', '[]'),
    ('[Emotional Openness] Which reaction from a partner feels safest?', 'single_choice', 'medium', '[{"value":"listens","label":"Just listens"},{"value":"advice","label":"Gives advice"},{"value":"comfort","label":"Offers physical comfort"},{"value":"asks","label":"Asks thoughtful questions"}]'),
    ('[Emotional Openness] I usually process emotions alone first.', 'yes_no', 'easy', '[]'),
    ('[Emotional Openness] How comfortable are you crying in front of a partner?', 'scale', 'hard', '[]'),
    ('[Emotional Openness] What emotional boundary matters most to you?', 'text', 'hard', '[]'),
    ('[Emotional Openness] Should partners regularly discuss emotional needs?', 'yes_no', 'medium', '[]'),
    ('[Emotional Openness] Which statement feels most true for you?', 'single_choice', 'easy', '[{"value":"share-fast","label":"I share quickly"},{"value":"share-slow","label":"I share slowly"},{"value":"depends","label":"It depends on situation"},{"value":"prefer-private","label":"I prefer keeping most things private"}]'),
    ('[Emotional Openness] How important is emotional reassurance after conflict?', 'scale', 'medium', '[]'),

    -- Initiative (10)
    ('[Initiative] Who should usually initiate date planning?', 'single_choice', 'easy', '[{"value":"mostly-me","label":"Mostly me"},{"value":"mostly-partner","label":"Mostly partner"},{"value":"take-turns","label":"Take turns"},{"value":"spontaneous","label":"Whoever feels it first"}]'),
    ('[Initiative] I enjoy surprising my partner with small gestures.', 'yes_no', 'easy', '[]'),
    ('[Initiative] How often do you want spontaneous romantic plans?', 'scale', 'medium', '[]'),
    ('[Initiative] What gesture would make you feel deeply chosen?', 'text', 'hard', '[]'),
    ('[Initiative] Should both partners split responsibility for emotional labor?', 'yes_no', 'hard', '[]'),
    ('[Initiative] Which initiative style matches you best?', 'single_choice', 'medium', '[{"value":"planner","label":"Structured planner"},{"value":"spark","label":"Spontaneous spark"},{"value":"supporter","label":"Support when asked"},{"value":"balanced","label":"Balanced mix"}]'),
    ('[Initiative] How much do you value proactive check-ins?', 'scale', 'easy', '[]'),
    ('[Initiative] What is one recurring ritual you would like to initiate?', 'text', 'medium', '[]'),
    ('[Initiative] Is it important that both partners propose future plans?', 'yes_no', 'medium', '[]'),
    ('[Initiative] Which area should initiative focus on first?', 'single_choice', 'easy', '[{"value":"dates","label":"Date ideas"},{"value":"care","label":"Care/support gestures"},{"value":"growth","label":"Relationship growth talks"},{"value":"fun","label":"Play and humor"}]'),

    -- Playfulness (10)
    ('[Playfulness] How important is shared humor in long-term chemistry?', 'scale', 'easy', '[]'),
    ('[Playfulness] I enjoy playful teasing when both sides are comfortable.', 'yes_no', 'easy', '[]'),
    ('[Playfulness] What type of playful moment do you enjoy most?', 'single_choice', 'easy', '[{"value":"inside-jokes","label":"Inside jokes"},{"value":"games","label":"Mini games"},{"value":"light-banter","label":"Light banter"},{"value":"creative-challenges","label":"Creative challenges"}]'),
    ('[Playfulness] Describe a playful boundary you want respected.', 'text', 'hard', '[]'),
    ('[Playfulness] Should humor be used to soften conflict?', 'yes_no', 'medium', '[]'),
    ('[Playfulness] How often would you like playful flirting in daily chats?', 'scale', 'medium', '[]'),
    ('[Playfulness] Which vibe matches your romantic humor?', 'single_choice', 'medium', '[{"value":"sweet","label":"Sweet and cute"},{"value":"witty","label":"Witty and clever"},{"value":"sarcastic","label":"Sarcastic (kindly)"},{"value":"chaotic","label":"Chaotic fun"}]'),
    ('[Playfulness] What is your favorite low-effort fun activity together?', 'text', 'easy', '[]'),
    ('[Playfulness] Is playful competitiveness healthy in your relationship?', 'yes_no', 'medium', '[]'),
    ('[Playfulness] Rate how much silliness helps you feel connected.', 'scale', 'easy', '[]'),

    -- Planning & Lifestyle (10)
    ('[Planning] On weekends, what planning style do you prefer?', 'single_choice', 'easy', '[{"value":"fully-planned","label":"Fully planned"},{"value":"light-plan","label":"Light plan with flexibility"},{"value":"go-with-flow","label":"Go with the flow"},{"value":"alternating","label":"Alternate each weekend"}]'),
    ('[Planning] I feel calmer when plans are confirmed in advance.', 'yes_no', 'easy', '[]'),
    ('[Planning] How important is punctuality to you in dates?', 'scale', 'medium', '[]'),
    ('[Planning] What is one routine you would love to keep as a couple?', 'text', 'medium', '[]'),
    ('[Planning] Should partners keep a shared calendar for key events?', 'yes_no', 'medium', '[]'),
    ('[Planning] Which trip style fits you best?', 'single_choice', 'medium', '[{"value":"itinerary","label":"Detailed itinerary"},{"value":"hybrid","label":"Hybrid"},{"value":"spontaneous","label":"Spontaneous"},{"value":"staycation","label":"Mostly staycations"}]'),
    ('[Planning] How flexible are you with last-minute changes?', 'scale', 'hard', '[]'),
    ('[Planning] What planning conflict happens most often for you?', 'text', 'hard', '[]'),
    ('[Planning] Is a monthly relationship check-in useful?', 'yes_no', 'medium', '[]'),
    ('[Planning] Which daily rhythm aligns best with you?', 'single_choice', 'easy', '[{"value":"early-bird","label":"Early bird"},{"value":"night-owl","label":"Night owl"},{"value":"mixed","label":"Mixed rhythm"},{"value":"depends-work","label":"Depends on workday"}]'),

    -- Affection & Intimacy (10)
    ('[Affection] Which affection style feels most natural to you?', 'single_choice', 'easy', '[{"value":"touch","label":"Physical touch"},{"value":"words","label":"Words of affirmation"},{"value":"acts","label":"Acts of service"},{"value":"quality-time","label":"Quality time"}]'),
    ('[Affection] I like frequent non-sexual physical closeness.', 'yes_no', 'easy', '[]'),
    ('[Affection] How comfortable are you expressing needs around intimacy?', 'scale', 'hard', '[]'),
    ('[Affection] What makes you feel safest during intimate moments?', 'text', 'hard', '[]'),
    ('[Affection] Should partners clearly discuss boundaries before new experiences?', 'yes_no', 'hard', '[]'),
    ('[Affection] How important is daily affection (hug, kiss, kind words)?', 'scale', 'medium', '[]'),
    ('[Affection] What pace of intimacy feels right early on?', 'single_choice', 'medium', '[{"value":"slow","label":"Slow and gradual"},{"value":"steady","label":"Steady natural pace"},{"value":"fast","label":"Fast if chemistry is strong"},{"value":"depends","label":"Depends on trust"}]'),
    ('[Affection] Share one affectionate habit you want more of.', 'text', 'medium', '[]'),
    ('[Affection] Is public affection important for feeling valued?', 'yes_no', 'medium', '[]'),
    ('[Affection] How important is emotional intimacy before physical intimacy?', 'scale', 'medium', '[]'),

    -- Togetherness & Space (10)
    ('[Togetherness] How many evenings per week together feels ideal?', 'single_choice', 'easy', '[{"value":"1-2","label":"1-2 evenings"},{"value":"3-4","label":"3-4 evenings"},{"value":"5-6","label":"5-6 evenings"},{"value":"daily","label":"Daily"}]'),
    ('[Togetherness] I need regular alone time even in close relationships.', 'yes_no', 'easy', '[]'),
    ('[Togetherness] How important is independent hobby time for you?', 'scale', 'medium', '[]'),
    ('[Togetherness] What helps you balance closeness and personal space?', 'text', 'medium', '[]'),
    ('[Togetherness] Should partners communicate plans when they need solo time?', 'yes_no', 'easy', '[]'),
    ('[Togetherness] Which co-living style sounds best?', 'single_choice', 'hard', '[{"value":"always-together","label":"Do most things together"},{"value":"balanced","label":"Balanced together/solo"},{"value":"independent","label":"Mostly independent routines"},{"value":"situational","label":"Depends on current season"}]'),
    ('[Togetherness] Rate how draining too much social time together feels.', 'scale', 'hard', '[]'),
    ('[Togetherness] What is your ideal weekly quality-time ritual?', 'text', 'easy', '[]'),
    ('[Togetherness] Is it healthy to have separate friend circles too?', 'yes_no', 'medium', '[]'),
    ('[Togetherness] How important is shared downtime with no agenda?', 'scale', 'easy', '[]'),

    -- Conflict & Repair (10)
    ('[Conflict] Which first response feels right after an argument?', 'single_choice', 'medium', '[{"value":"talk-now","label":"Talk immediately"},{"value":"cooldown","label":"Short cooldown then talk"},{"value":"write-first","label":"Write thoughts first"},{"value":"hug-first","label":"Reconnect physically first"}]'),
    ('[Conflict] I can apologize even when I still feel hurt.', 'yes_no', 'hard', '[]'),
    ('[Conflict] How important is naming the real issue, not symptoms?', 'scale', 'medium', '[]'),
    ('[Conflict] What repair action helps you trust again fastest?', 'text', 'hard', '[]'),
    ('[Conflict] Should repeated conflicts trigger a deeper pattern conversation?', 'yes_no', 'medium', '[]'),
    ('[Conflict] How safe do you feel expressing anger respectfully?', 'scale', 'hard', '[]'),
    ('[Conflict] What boundary should never be crossed in conflict?', 'text', 'hard', '[]'),
    ('[Conflict] Is taking responsibility more important than being right?', 'yes_no', 'medium', '[]'),
    ('[Conflict] Which repair language works best for you?', 'single_choice', 'easy', '[{"value":"sorry-and-plan","label":"Apology + clear plan"},{"value":"comfort-first","label":"Comfort first"},{"value":"facts","label":"Facts and accountability"},{"value":"time-and-actions","label":"Time plus consistent actions"}]'),
    ('[Conflict] How quickly do you usually return to connection after conflict?', 'scale', 'medium', '[]'),

    -- Values & Future (10)
    ('[Values] Which area needs strongest long-term alignment?', 'single_choice', 'medium', '[{"value":"family","label":"Family vision"},{"value":"money","label":"Money habits"},{"value":"lifestyle","label":"Lifestyle pace"},{"value":"growth","label":"Personal growth priorities"}]'),
    ('[Values] Shared core values matter more than shared hobbies.', 'yes_no', 'easy', '[]'),
    ('[Values] How aligned should long-term life goals be?', 'scale', 'medium', '[]'),
    ('[Values] What future milestone feels most meaningful to you?', 'text', 'medium', '[]'),
    ('[Values] Should couples discuss finances early in serious dating?', 'yes_no', 'hard', '[]'),
    ('[Values] How important is mutual support for career ambition?', 'scale', 'medium', '[]'),
    ('[Values] Which future planning horizon feels right now?', 'single_choice', 'easy', '[{"value":"3-months","label":"3 months"},{"value":"1-year","label":"1 year"},{"value":"3-years","label":"3 years"},{"value":"flexible","label":"Keep it flexible"}]'),
    ('[Values] What non-negotiable value do you bring into relationships?', 'text', 'hard', '[]'),
    ('[Values] Is compromise healthy even on strongly held preferences?', 'yes_no', 'medium', '[]'),
    ('[Values] How important is a shared definition of success?', 'scale', 'hard', '[]'),

    -- Trust & Fidelity (10)
    ('[Trust] Which behavior builds trust fastest for you?', 'single_choice', 'easy', '[{"value":"consistency","label":"Consistency"},{"value":"transparency","label":"Transparency"},{"value":"follow-through","label":"Following through"},{"value":"accountability","label":"Owning mistakes"}]'),
    ('[Trust] I prefer explicit agreements over assumptions in boundaries.', 'yes_no', 'medium', '[]'),
    ('[Trust] How hard is it for you to rebuild trust after disappointment?', 'scale', 'hard', '[]'),
    ('[Trust] What does emotional fidelity mean to you personally?', 'text', 'hard', '[]'),
    ('[Trust] Should social media boundaries be discussed openly?', 'yes_no', 'medium', '[]'),
    ('[Trust] How important is location/time transparency in daily life?', 'scale', 'medium', '[]'),
    ('[Trust] Which privacy balance feels healthiest?', 'single_choice', 'hard', '[{"value":"full-privacy","label":"High personal privacy"},{"value":"shared-context","label":"Share context, keep privacy"},{"value":"mostly-open","label":"Mostly open access"},{"value":"case-by-case","label":"Case-by-case"}]'),
    ('[Trust] Describe one trust repair action you truly believe in.', 'text', 'hard', '[]'),
    ('[Trust] Is jealousy best handled by immediate honest conversation?', 'yes_no', 'easy', '[]'),
    ('[Trust] How important is reliability in small promises?', 'scale', 'easy', '[]')
) as seed(prompt, question_type, difficulty, options)
where not exists (
  select 1
  from public.quiz_questions q
  where q.prompt = seed.prompt
);
