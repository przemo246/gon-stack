import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { createRoom } from '@/server/application/procedures/create-room';

export const prerender = false;

export const POST: APIRoute = astroAdapter(createRoom);
