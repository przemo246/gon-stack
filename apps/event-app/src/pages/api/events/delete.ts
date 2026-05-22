import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventDelete } from '@/server/application/procedures/event-delete';

export const prerender = false;

export const DELETE: APIRoute = astroAdapter(eventDelete);
