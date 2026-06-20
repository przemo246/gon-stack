-- Support locations without a street address (parks, lakes, fields, landmarks).
-- The canonical location is now coordinates + a place name; the structured street
-- address becomes optional, while postal code and city remain required.

alter table public.events add column place_name text not null default '';
alter table public.events alter column place_name drop default;

alter table public.events alter column street drop not null;
alter table public.events alter column number drop not null;

-- rollback:
--   alter table public.events alter column number set not null;
--   alter table public.events alter column street set not null;
--   alter table public.events drop column place_name;
