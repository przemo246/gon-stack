export interface Event {
  id: number;
  title: string;
  cat: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  tag: string;
  dateKey: string;
  poster: number;
}

export interface PosterData {
  bg: string;
  shape:
    | 'radial'
    | 'rings'
    | 'grid'
    | 'sun'
    | 'waves'
    | 'bloom'
    | 'tape'
    | 'triangle';
}

export interface DateChip {
  id: string;
  label: string;
}

export interface CityData {
  city: string;
  count: number;
}

export interface HowStep {
  n: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  active?: boolean;
}

export interface FooterSection {
  title: string;
  links: string[];
}

export interface TicketScheduleItem {
  time: string;
  venue: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export const MOCK_CATEGORIES = [
  'Wszystko',
  'Muzyka',
  'Teatr',
  'Sztuka',
  'Sport',
  'Food & Drink',
  'Festiwale',
  'Dzieci',
  'Kultura',
  'Warsztaty',
  'Kluby',
  'Literatura',
];

export const MOCK_DATE_CHIPS: DateChip[] = [
  { id: 'any', label: 'Dowolnie' },
  { id: 'today', label: 'Dziś' },
  { id: 'tomorrow', label: 'Jutro' },
  { id: 'weekend', label: 'W weekend' },
  { id: 'week', label: 'Ten tydzień' },
  { id: 'month', label: 'Ten miesiąc' },
  { id: 'free', label: 'Za darmo' },
];

export const MOCK_CITIES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Gdańsk',
  'Poznań',
  'Łódź',
  'Katowice',
  'Lublin',
  'Toruń',
  'Szczecin',
];

export const MOCK_POSTERS: PosterData[] = [
  {
    bg: 'linear-gradient(135deg,#ff8a5b 0%,#ff5733 50%,#7a1f0a 100%)',
    shape: 'radial',
  },
  {
    bg: 'linear-gradient(170deg,#0b0a14 0%,#2a1a6b 55%,#6b4df0 100%)',
    shape: 'rings',
  },
  {
    bg: 'linear-gradient(180deg,#1a2e1a 0%,#2d6a3d 60%,#c8ee48 100%)',
    shape: 'grid',
  },
  {
    bg: 'linear-gradient(160deg,#2b1010 0%,#8a1c1c 50%,#ffb86b 100%)',
    shape: 'sun',
  },
  {
    bg: 'linear-gradient(200deg,#0d1a2b 0%,#1e4d8c 55%,#7bcaff 100%)',
    shape: 'waves',
  },
  {
    bg: 'linear-gradient(145deg,#3a0f2a 0%,#8a2564 45%,#ff8fd4 100%)',
    shape: 'bloom',
  },
  {
    bg: 'linear-gradient(135deg,#1b1b1b 0%,#3a3a3a 50%,#e8d9b0 100%)',
    shape: 'tape',
  },
  {
    bg: 'linear-gradient(150deg,#0f2d2f 0%,#1f6c6f 60%,#e8ff6b 100%)',
    shape: 'triangle',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Noc Muzeów — Warszawa 2026',
    cat: 'Kultura',
    city: 'Warszawa',
    venue: 'Muzeum Narodowe',
    date: 'sob, 16 maj',
    time: '19:00',
    price: 0,
    tag: 'Wstęp wolny',
    dateKey: 'weekend',
    poster: 1,
  },
  {
    id: 2,
    title: "Open'er Festival — dzień 2.",
    cat: 'Festiwale',
    city: 'Gdynia',
    venue: 'Lotnisko Babie Doły',
    date: 'pt, 3 lip',
    time: '15:00',
    price: 399,
    tag: 'Line-up 2026',
    dateKey: 'month',
    poster: 0,
  },
  {
    id: 3,
    title: 'Koncert: Dawid Podsiadło',
    cat: 'Muzyka',
    city: 'Kraków',
    venue: 'TAURON Arena',
    date: 'śr, 22 kwi',
    time: '20:00',
    price: 249,
    tag: 'Ostatnie bilety',
    dateKey: 'today',
    poster: 2,
  },
  {
    id: 4,
    title: 'Hamlet — reż. Krzysztof Warlikowski',
    cat: 'Teatr',
    city: 'Warszawa',
    venue: 'Nowy Teatr',
    date: 'czw, 23 kwi',
    time: '19:30',
    price: 120,
    tag: 'Premiera',
    dateKey: 'tomorrow',
    poster: 3,
  },
  {
    id: 5,
    title: 'Pierogi Festival',
    cat: 'Food & Drink',
    city: 'Kraków',
    venue: 'Mały Rynek',
    date: 'sob-nd, 25–26 kwi',
    time: '12:00',
    price: 0,
    tag: 'Wstęp wolny',
    dateKey: 'weekend',
    poster: 4,
  },
  {
    id: 6,
    title: 'Legia — Lech Poznań',
    cat: 'Sport',
    city: 'Warszawa',
    venue: 'Stadion Wojska Polskiego',
    date: 'nd, 26 kwi',
    time: '17:30',
    price: 85,
    tag: 'Ekstraklasa',
    dateKey: 'weekend',
    poster: 5,
  },
  {
    id: 7,
    title: 'Wystawa: Wojciech Fangor',
    cat: 'Sztuka',
    city: 'Wrocław',
    venue: 'Pawilon Czterech Kopuł',
    date: 'do 15 cze',
    time: '10–18',
    price: 25,
    tag: 'Tylko do 15.06',
    dateKey: 'month',
    poster: 6,
  },
  {
    id: 8,
    title: 'Warsztat ceramiki — koło garncarskie',
    cat: 'Warsztaty',
    city: 'Poznań',
    venue: 'Studio Glina',
    date: 'sob, 25 kwi',
    time: '11:00',
    price: 160,
    tag: '6 miejsc',
    dateKey: 'weekend',
    poster: 7,
  },
  {
    id: 9,
    title: 'Smolasty — trasa „Nocnik"',
    cat: 'Muzyka',
    city: 'Łódź',
    venue: 'Atlas Arena',
    date: 'pt, 8 maj',
    time: '20:00',
    price: 189,
    tag: 'Nowy album',
    dateKey: 'month',
    poster: 1,
  },
  {
    id: 10,
    title: 'Targi Książki',
    cat: 'Literatura',
    city: 'Warszawa',
    venue: 'PKiN',
    date: 'czw–nd, 21–24 maj',
    time: '10–19',
    price: 15,
    tag: '46. edycja',
    dateKey: 'month',
    poster: 2,
  },
  {
    id: 11,
    title: 'Dzień Dziecka w ZOO',
    cat: 'Dzieci',
    city: 'Wrocław',
    venue: 'ZOO Wrocław',
    date: 'pn, 1 cze',
    time: '9:00',
    price: 35,
    tag: 'Rodzinnie',
    dateKey: 'month',
    poster: 3,
  },
  {
    id: 12,
    title: 'Boiler Room: Warsaw',
    cat: 'Kluby',
    city: 'Warszawa',
    venue: 'Smolna',
    date: 'sob, 25 kwi',
    time: '22:00',
    price: 140,
    tag: 'B2B set',
    dateKey: 'weekend',
    poster: 5,
  },
];

export const MOCK_MARQUEE_ITEMS = [
  'DAWID PODSIADŁO · KRAKÓW',
  'NOC MUZEÓW · 16 MAJA',
  "OPEN'ER · DZIEŃ 2",
  'PIEROGI FESTIVAL · KRAKÓW',
  'HAMLET — WARLIKOWSKI · PREMIERA',
  'BOILER ROOM · WARSZAWA',
  'TARGI KSIĄŻKI · PKIN',
  'LEGIA — LECH POZNAŃ · SOBOTA',
  'FANGOR · OSTATNIE DNI',
];

export const MOCK_CITY_DATA: CityData[] = [
  { city: 'Warszawa', count: 412 },
  { city: 'Kraków', count: 298 },
  { city: 'Wrocław', count: 187 },
  { city: 'Gdańsk', count: 156 },
  { city: 'Poznań', count: 142 },
  { city: 'Łódź', count: 98 },
  { city: 'Katowice', count: 76 },
  { city: 'Lublin', count: 54 },
];

export const MOCK_HOW_STEPS: HowStep[] = [
  {
    n: '01',
    title: 'Filtruj',
    description:
      'Po mieście, dacie, nastroju, budżecie. Zero algorytmicznego szumu — ty ustawiasz reguły.',
  },
  {
    n: '02',
    title: 'Zapisuj',
    description:
      'Dodaj wydarzenie do swojej listy. Dostajesz przypomnienie 24h wcześniej — e-mailem albo do kalendarza.',
  },
  {
    n: '03',
    title: 'Kupuj bilet',
    description:
      'Bezpośrednio od organizatora albo przez sprawdzonych partnerów. Bez ukrytych opłat.',
  },
  {
    n: '04',
    title: 'Idź',
    description:
      'Bilet czeka w aplikacji. Mapa, godzina, wskazówki dojazdu — wszystko w jednym miejscu.',
  },
];

export const MOCK_NAV_LINKS: NavLink[] = [
  { label: 'Odkrywaj', active: true },
  { label: 'Kalendarz' },
  { label: 'Miasta' },
  { label: 'Dla organizatorów' },
  { label: 'Blog' },
];

export const MOCK_FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Odkrywaj',
    links: [
      'Dziś wieczorem',
      'Ten weekend',
      'Za darmo',
      'Z dzieckiem',
      'Dla jednego',
    ],
  },
  {
    title: 'Miasta',
    links: ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk', 'Wszystkie 92 →'],
  },
  {
    title: 'Dla organizatorów',
    links: ['Dodaj wydarzenie', 'Panel sprzedaży', 'Cennik', 'API', 'Pomoc'],
  },
  { title: 'Firma', links: ['O nas', 'Blog', 'Kariera', 'Kontakt', 'Prasa'] },
];

export const MOCK_TICKET_SCHEDULE: TicketScheduleItem[] = [
  { time: '19:00', venue: 'Kino Muranów — pokaz specjalny' },
  { time: '20:30', venue: 'Hala Koszyki — kolacja szefa' },
  { time: '22:00', venue: 'Smolna — Boiler Room' },
  { time: '00:30', venue: 'Plac Zbawiciela — after' },
];

export const MOCK_STATS: Stat[] = [
  { value: '92', label: 'miasta' },
  { value: '38k', label: 'wydarzeń' },
  { value: '4,9★', label: 'od 12 400 osób' },
];

export const MOCK_SORT_OPTIONS: SortOption[] = [
  { value: 'rec', label: 'Polecane' },
  { value: 'soon', label: 'Najbliższe' },
  { value: 'cheap', label: 'Cena rosnąco' },
  { value: 'pop', label: 'Popularne' },
];

export const MOCK_HERO_EYEBROW = '№ 17 · KWIECIEŃ 2026';
export const MOCK_HERO_STATUS = '1 284 wydarzeń w tym tygodniu';
export const MOCK_HERO_TICKER_TIME = '18:42';
export const MOCK_HERO_SUBTITLE =
  'Afisz to mapa wydarzeń w 92 polskich miastach — koncerty, wernisaże, spektakle, festiwale kuchni i wszystko pomiędzy. Znajdź, zarezerwuj, idź.';
export const MOCK_HERO_CTA_PRIMARY = 'Przeglądaj afisz →';
export const MOCK_HERO_CTA_SECONDARY = 'Jak to działa';

export const MOCK_TICKET_TITLE = 'Noc afisza';
export const MOCK_TICKET_DATE_LABEL = 'TONIGHT / DZIŚ · 20:00';
export const MOCK_TICKET_NUM = '№ 00 142 / A';
export const MOCK_TICKET_SEAT = 'SEAT · K 14';
export const MOCK_TICKET_URL = 'AFISZ.PL/142A';

export const MOCK_EVENTS_SECTION_EYEBROW = '№ 01 · POLECANE';
export const MOCK_EVENTS_SECTION_TITLE = 'Co dzieje się w Polsce';
export const MOCK_CITIES_SECTION_EYEBROW = '№ 02 · GDZIE';
export const MOCK_CITIES_SECTION_TITLE = 'Miasta, w których się dzieje';
export const MOCK_HOW_SECTION_EYEBROW = '№ 03 · JAK';
export const MOCK_HOW_SECTION_TITLE = 'Cztery kroki, zero zgadywanki';

export const MOCK_FEATURED_COPY =
  'Jedna z najgłośniejszych tras ostatnich lat. Trzy godziny koncertu, nowy materiał z płyty i wybór największych hitów. Bilety rozchodzą się w tempie zauważalnym — zostało 8% puli.';

export const MOCK_CTA_HEADING = 'Nie przegap niczego.';
export const MOCK_CTA_SUBTITLE =
  'Raz w tygodniu — krótki newsletter z najlepszymi wydarzeniami w twoim mieście. Kuratorski wybór, nie algorytm. Zero spamu.';
export const MOCK_CTA_NEWSLETTER_CITIES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Gdańsk',
];
export const MOCK_CTA_APP_BUTTONS = ['Pobierz aplikację iOS', 'Android'];

export const MOCK_FOOTER_TAGLINE =
  'Wydarzenia w 92 polskich miastach. Kuratorsko. Bez śmieciowych treści.';
export const MOCK_FOOTER_CITIES_LINE = 'WARSZAWA · KRAKÓW · GDAŃSK';
export const MOCK_FOOTER_COPYRIGHT = '© 2026 Afisz sp. z o.o. · Warszawa';
export const MOCK_FOOTER_LEGAL_LINKS = [
  'Regulamin',
  'Polityka prywatności',
  'Cookies',
];
