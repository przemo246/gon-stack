import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { leaveRoom } from '@/server/application/procedures/leave-room';

export const prerender = false;

export const POST: APIRoute = astroAdapter(leaveRoom);
