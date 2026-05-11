export interface Event {
  id: string;
  name: string;
  category: string;
  city: string;
  venue: string;
  date: string;
  endDate?: string;
  time: string;
  palette: number;
  posterTitle: string;
  posterMeta: string;
  description: string;
  featured: boolean;
  badge?: string;
}

export interface PosterPalette {
  bg: string;
  fg: string;
  accent: string;
}

export interface Category {
  id: string;
  label: string;
  mono: string;
}

export const POSTER_PALETTES: PosterPalette[] = [
  { bg: '#003c33', fg: '#edfce9', accent: '#ff7759' },
  { bg: '#071829', fg: '#f1f5ff', accent: '#ff7759' },
  { bg: '#ff7759', fg: '#17171c', accent: '#003c33' },
  { bg: '#17171c', fg: '#eeece7', accent: '#ff7759' },
  { bg: '#eeece7', fg: '#17171c', accent: '#003c33' },
  { bg: '#edfce9', fg: '#003c33', accent: '#ff7759' },
  { bg: '#9b60aa', fg: '#f1f5ff', accent: '#ffad9b' },
  { bg: '#1863dc', fg: '#f1f5ff', accent: '#ff7759' },
];

export const CATEGORIES: Category[] = [
  { id: 'koncerty', label: 'Koncerty', mono: 'MUSIC.LIVE' },
  { id: 'festiwale', label: 'Festiwale', mono: 'FEST.OPEN-AIR' },
  { id: 'sport', label: 'Sport', mono: 'SPORT.LIVE' },
  { id: 'teatr', label: 'Teatr i opera', mono: 'STAGE.DRAMA' },
  { id: 'stand-up', label: 'Stand-up', mono: 'COMEDY.MIC' },
  { id: 'rodzinne', label: 'Rodzinne', mono: 'FAMILY.KIDS' },
  { id: 'konferencje', label: 'Konferencje', mono: 'TALKS.IDEAS' },
  { id: 'wystawy', label: 'Wystawy', mono: 'ART.EXHIBIT' },
  { id: 'kluby', label: 'Kluby', mono: 'NIGHT.CLUB' },
];

export const CITIES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Łódź',
  'Katowice',
  'Lublin',
  'Szczecin',
  'Bydgoszcz',
  'Białystok',
  'Toruń',
  'Rzeszów',
  'Sopot',
  'Gdynia',
];

export const EVENTS: Event[] = [
  {
    id: 'tame-impala-warszawa',
    name: 'Tame Impala — Deadbeat Tour',
    category: 'koncerty',
    city: 'Warszawa',
    venue: 'PGE Narodowy',
    date: '2026-06-14',
    time: '20:00',
    palette: 0,
    posterTitle: 'TAME\nIMPALA',
    posterMeta: 'DEADBEAT TOUR — EU 2026',
    description:
      'Kevin Parker powraca do Polski z nowym albumem „Deadbeat". Psychodeliczny krajobraz, lasery, syntezatory i ten charakterystyczny basowy puls.',
    featured: true,
    badge: 'Najgorętsze',
  },
  {
    id: 'open-er-2026',
    name: "Open'er Festival 2026",
    category: 'festiwale',
    city: 'Gdynia',
    venue: 'Lotnisko Kosakowo',
    date: '2026-07-01',
    endDate: '2026-07-04',
    time: '16:00',
    palette: 2,
    posterTitle: "OPEN'ER\n'26",
    posterMeta: '4 DNI · 8 SCEN · 120 ARTYSTÓW',
    description:
      "Cztery dni nad Bałtykiem. Headlinerzy, alternatywa, sztuka, kino. Open'er znów składa Polskę latem.",
    featured: true,
    badge: '4 dni',
  },
  {
    id: 'lech-legia-derby',
    name: 'Lech Poznań — Legia Warszawa',
    category: 'sport',
    city: 'Poznań',
    venue: 'Stadion Poznań',
    date: '2026-05-23',
    time: '18:00',
    palette: 3,
    posterTitle: 'LECH\nLEGIA',
    posterMeta: 'EKSTRAKLASA · KOLEJKA 33',
    description:
      'Klasyk polskiej Ekstraklasy. Trybuny pełne, oprawy gotowe, stawka — mistrzostwo. 90 minut, które oglądają wszyscy.',
    featured: true,
    badge: 'Hit kolejki',
  },
  {
    id: 'kacper-rucinski-standup',
    name: 'Kacper Ruciński — Materiał Otwarty',
    category: 'stand-up',
    city: 'Kraków',
    venue: 'Klub Studio',
    date: '2026-05-18',
    time: '19:30',
    palette: 5,
    posterTitle: 'KACPER\nRUCIŃSKI',
    posterMeta: 'MATERIAŁ OTWARTY · 90 MIN',
    description:
      'Trasa testowa nowego godzinnego materiału. Bez kamer, bez nagrań, bez filtra — w kameralnym układzie z miejscem na improwizację.',
    featured: true,
  },
  {
    id: 'mloda-polska-mnk',
    name: 'Młoda Polska — Wystawa stała',
    category: 'wystawy',
    city: 'Kraków',
    venue: 'Muzeum Narodowe w Krakowie',
    date: '2026-05-10',
    endDate: '2026-09-30',
    time: '10:00',
    palette: 4,
    posterTitle: 'MŁODA\nPOLSKA',
    posterMeta: 'WYSPIAŃSKI · MEHOFFER · MALCZEWSKI',
    description:
      'Największa od dekady prezentacja prac Stanisława Wyspiańskiego, Józefa Mehoffera i Jacka Malczewskiego. 230 obiektów, 9 sal.',
    featured: true,
  },
  {
    id: 'smolasty-spodek',
    name: 'Smolasty — Era 03',
    category: 'koncerty',
    city: 'Katowice',
    venue: 'Spodek',
    date: '2026-06-07',
    time: '20:00',
    palette: 7,
    posterTitle: 'SMOLASTY\nERA 03',
    posterMeta: 'TRASA POLSKA · 12 MIAST',
    description:
      'Trzeci akt. Nowy album, nowa scenografia, sekcja smyczkowa i pełna hala Spodka.',
    featured: true,
    badge: 'Nowy album',
  },
  {
    id: 'infoshare-2026',
    name: 'infoShare 2026',
    category: 'konferencje',
    city: 'Gdańsk',
    venue: 'AmberExpo',
    date: '2026-05-28',
    endDate: '2026-05-29',
    time: '09:00',
    palette: 1,
    posterTitle: 'INFO\nSHARE 26',
    posterMeta: 'AI · BIZNES · STARTUPY',
    description:
      'Największa konferencja technologiczna w CEE. 6 scen, 250 prelegentów, 6000 uczestników.',
    featured: true,
  },
  {
    id: 'nosowska-wroclaw',
    name: 'Kasia Nosowska — Trasa akustyczna',
    category: 'koncerty',
    city: 'Wrocław',
    venue: 'Hala Stulecia',
    date: '2026-06-02',
    time: '20:00',
    palette: 4,
    posterTitle: 'NOSOWSKA',
    posterMeta: 'AKUSTYCZNIE · 18 MIAST',
    description:
      'Akustyczny set, sześcioosobowy zespół, repertuar z całej kariery i nowe interpretacje.',
    featured: false,
  },
  {
    id: 'audioriver-2026',
    name: 'Audioriver 2026',
    category: 'festiwale',
    city: 'Płock',
    venue: 'Plaża nad Wisłą',
    date: '2026-07-24',
    endDate: '2026-07-26',
    time: '16:00',
    palette: 2,
    posterTitle: 'AUDIO\nRIVER',
    posterMeta: 'ELEKTRONIKA · 3 DNI · WISŁA',
    description:
      'Jeden z największych festiwali muzyki elektronicznej w Europie Środkowej. Plaża, Wisła, świt nad sceną główną.',
    featured: false,
  },
];

export function fmtDateShort(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function fmtDate(iso: string) {
  const months = [
    'sty',
    'lut',
    'mar',
    'kwi',
    'maj',
    'cze',
    'lip',
    'sie',
    'wrz',
    'paź',
    'lis',
    'gru',
  ];
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function getCategoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
