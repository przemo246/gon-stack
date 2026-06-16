-- storage bucket for event posters; public read, authenticated write
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-posters',
  'event-posters',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- all users (anon + authenticated) can read posters
create policy "event_posters_select_all"
  on storage.objects for select
  using (bucket_id = 'event-posters');

-- authenticated users can upload posters
create policy "event_posters_insert_authenticated"
  on storage.objects for insert
  with check (bucket_id = 'event-posters' and auth.uid() is not null);

-- authenticated users can replace posters
create policy "event_posters_update_authenticated"
  on storage.objects for update
  using (bucket_id = 'event-posters' and auth.uid() is not null);

-- authenticated users can delete posters
create policy "event_posters_delete_authenticated"
  on storage.objects for delete
  using (bucket_id = 'event-posters' and auth.uid() is not null);

-- rollback:
--   drop policy "event_posters_delete_authenticated" on storage.objects;
--   drop policy "event_posters_update_authenticated" on storage.objects;
--   drop policy "event_posters_insert_authenticated" on storage.objects;
--   drop policy "event_posters_select_all" on storage.objects;
--   delete from storage.buckets where id = 'event-posters';
