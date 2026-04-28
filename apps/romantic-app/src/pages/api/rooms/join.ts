import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { joinRoom } from '@/server/application/procedures/join-room';

export const prerender = false;

export const POST: APIRoute = astroAdapter(joinRoom);
