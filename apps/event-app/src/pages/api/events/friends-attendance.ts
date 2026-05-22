import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { eventGetFriendsAttendance } from '@/server/application/procedures/event-get-friends-attendance';

export const prerender = false;

export const GET: APIRoute = astroAdapter(eventGetFriendsAttendance);
