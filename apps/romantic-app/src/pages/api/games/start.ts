import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { startGame } from '@/server/application/procedures/start-game';

export const prerender = false;

export const POST: APIRoute = astroAdapter(startGame);
