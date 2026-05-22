import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventCreate } from '@/server/application/procedures/event-create';

export const prerender = false;

export const POST: APIRoute = astroAdapter(eventCreate);
