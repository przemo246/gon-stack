import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventSearch } from '@/server/application/procedures/event-search';

export const prerender = false;

export const GET: APIRoute = astroAdapter(eventSearch);
