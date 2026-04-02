import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { getUserProfileQuestions } from '@/server/application/procedures/get-user-profile-questions';

export const prerender = false;

export const GET: APIRoute = astroAdapter(getUserProfileQuestions);
