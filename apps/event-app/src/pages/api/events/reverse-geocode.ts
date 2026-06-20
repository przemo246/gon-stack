import type { APIRoute } from 'astro';
import { astroAdapter } from '@/server/application/adapter/astro';
import { reverseGeocode } from '@/server/application/procedures/reverse-geocode';

export const prerender = false;

export const GET: APIRoute = astroAdapter(reverseGeocode);
