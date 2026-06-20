import { schema, type GeoResult } from '@schemas/geocode-address';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { publicProcedure } from '../../core/procedure';
import { toGeoResult, type NominatimPlace } from '../shared/nominatim';

export const geocodeAddress = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ q }) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&namedetails=1&limit=5&accept-language=pl`;

    let res: Response;
    try {
      res = await fetch(url, {
        headers: {
          'Accept-Language': 'pl',
          'User-Agent': 'Afisz/1.0 (event-app)',
        },
      });
    } catch {
      throw new InternalServer('Geocoding service unavailable');
    }

    if (!res.ok) throw new InternalServer('Geocoding service unavailable');

    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new InternalServer('Geocoding failed');

    const results: GeoResult[] = (data as NominatimPlace[]).map(toGeoResult);

    return { code: 200 as const, results };
  },
});
