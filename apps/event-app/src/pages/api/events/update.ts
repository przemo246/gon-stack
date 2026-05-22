import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventUpdate } from '@/server/application/procedures/event-update';

export const prerender = false;

export const PATCH: APIRoute = astroAdapter(eventUpdate);
