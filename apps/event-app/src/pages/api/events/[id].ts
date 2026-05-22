import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventGetById } from '@/server/application/procedures/event-get-by-id';

export const prerender = false;

export const GET: APIRoute = astroAdapter(eventGetById);
