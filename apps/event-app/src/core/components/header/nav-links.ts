export interface NavLink {
  label: string;
  active?: boolean;
}

export const MOCK_NAV_LINKS: NavLink[] = [
  { label: 'Odkrywaj', active: true },
  { label: 'Kalendarz' },
  { label: 'Miasta' },
  { label: 'Dla organizatorów' },
  { label: 'Blog' },
];
