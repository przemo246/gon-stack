import { schema } from '@schemas/reverse-geocode';
import { InternalServer, NotFound } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { publicProcedure } from '../../core/procedure';
import { toGeoResult, type NominatimPlace } from '../shared/nominatim';

export const reverseGeocode = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ lat, lng }) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&namedetails=1&accept-language=pl`;

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

    const data = (await res.json()) as NominatimPlace & { error?: string };
    if (!data || data.error || !data.lat)
      throw new NotFound('Location not found');

    return { code: 200 as const, result: toGeoResult(data) };
  },
});
