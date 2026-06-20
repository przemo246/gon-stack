import type { GeoResult } from '@schemas/geocode-address';

// Shape of a Nominatim place returned with `addressdetails=1&namedetails=1`.
// Most fields are optional — coverage varies by location.
export type NominatimPlace = {
  lat: string;
  lon: string;
  name?: string;
  display_name?: string;
  namedetails?: { name?: string };
  address?: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    county?: string;
    [key: string]: string | undefined;
  };
};

const cityOf = (a: NominatimPlace['address']): string | undefined =>
  a?.city ?? a?.town ?? a?.village ?? a?.municipality ?? a?.county;

const nameOf = (place: NominatimPlace): string => {
  const explicit = place.namedetails?.name ?? place.name;
  if (explicit) return explicit;
  // Fall back to "road number" then the leading part of the display name.
  const a = place.address;
  if (a?.road) return [a.road, a.house_number].filter(Boolean).join(' ');
  return place.display_name?.split(',')[0]?.trim() ?? '';
};

// Map a raw Nominatim place into the contract's GeoResult. `undefined` (not '')
// for missing parts so the client can reliably tell "absent" from "empty".
export const toGeoResult = (place: NominatimPlace): GeoResult => {
  const a = place.address;
  return {
    name: nameOf(place),
    street: a?.road || undefined,
    number: a?.house_number || undefined,
    postalCode: a?.postcode || undefined,
    city: cityOf(a) || undefined,
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
    displayName: place.display_name ?? '',
  };
};
