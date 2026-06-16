import type { Schema as CreateEventSchema } from '@/shared/server-contracts/schemas/create-event';
import type { Schema as GeocodeSchema } from '@/shared/server-contracts/schemas/geocode-address';
import type { Schema as SuggestKeywordsSchema } from '@/shared/server-contracts/schemas/suggest-event-keywords';
import type { InferOut } from '@/shared/server-contracts/extraction';
import { supabaseBrowser } from '@/shared/data-sources/supabase-browser';

export type CreateEventInput = CreateEventSchema['in'];

const POSTER_BUCKET = 'event-posters';
const POSTER_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const POSTER_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export const POSTER_ACCEPT = POSTER_TYPES.join(',');

export const uploadPoster = async (file: File): Promise<string> => {
  if (!POSTER_TYPES.includes(file.type)) {
    throw new Error('Dozwolone formaty: JPG, PNG, WEBP, AVIF.');
  }
  if (file.size > POSTER_MAX_BYTES) {
    throw new Error('Maksymalny rozmiar pliku to 5 MB.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseBrowser.storage
    .from(POSTER_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) {
    throw new Error('Nie udało się przesłać pliku. Spróbuj ponownie.');
  }

  const { data } = supabaseBrowser.storage
    .from(POSTER_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
};

export const createEvent = async (
  data: CreateEventInput,
  signal: AbortSignal,
): Promise<void> => {
  const res = await fetch('/api/event/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.message ?? 'Coś poszło nie tak. Spróbuj ponownie później.';
    throw new Error(message);
  }
};

export const suggestKeywords = async (
  data: { name: string; description?: string; category?: string },
  signal: AbortSignal,
): Promise<InferOut<SuggestKeywordsSchema['out'], 200>> => {
  const res = await fetch('/api/event/suggest-keywords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal,
  });
  if (!res.ok) {
    throw new Error('Coś poszło nie tak. Spróbuj ponownie później.');
  }

  return await res.json();
};

export const geocodeAddress = async (
  query: string,
  signal: AbortSignal,
): Promise<{ lat: number; lng: number } | null> => {
  const res = await fetch(`/api/event/geocode?q=${encodeURIComponent(query)}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error('Coś poszło nie tak. Spróbuj ponownie później.');
  }

  const data = (await res.json()) as InferOut<GeocodeSchema['out']>;

  if (data.code !== 200) {
    throw new Error('Coś poszło nie tak. Spróbuj ponownie później.');
  }

  return { lat: data.lat, lng: data.lng };
};
