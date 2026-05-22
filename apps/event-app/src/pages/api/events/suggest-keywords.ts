import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventSuggestKeywords } from '@/server/application/procedures/event-suggest-keywords';

export const prerender = false;

export const POST: APIRoute = astroAdapter(eventSuggestKeywords);
