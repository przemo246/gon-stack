const FOOTER_COLS = [
  {
    title: 'ODKRYWAJ',
    links: [
      'Koncerty',
      'Festiwale',
      'Sport',
      'Teatr i opera',
      'Wystawy',
      'Stand-up',
      'Kluby',
    ],
  },
  {
    title: 'MIASTA',
    links: [
      'Warszawa',
      'Kraków',
      'Wrocław',
      'Poznań',
      'Gdańsk',
      'Łódź',
      'Katowice',
    ],
  },
  {
    title: 'ORGANIZATORZY',
    links: [
      'Dodaj wydarzenie',
      'Panel organizatora',
      'Kalendarz publiczny',
      'API · pl',
      'Pomoc',
    ],
  },
];

export const Footer = () => (
  <footer
    className="mt-16 px-8 pt-20 pb-8"
    style={{ backgroundColor: '#17171c', color: '#eeece7' }}
  >
    <div
      className="max-w-360 mx-auto grid gap-12"
      style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}
    >
      <div className="flex flex-col gap-3">
        <div className="font-sans font-semibold text-[36px] tracking-tight">
          Afisz<span style={{ color: '#ff7759' }}>.</span>
        </div>
        <p
          className="text-sm max-w-[32ch] m-0 mb-2"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Cała Polska na żywo. Promocja wydarzeń, nie sprzedaż biletów.
        </p>
        <span
          className="font-mono text-[11px] tracking-[0.18em] uppercase"
          style={{ opacity: 0.5 }}
        >
          WYD. 2026 · WERSJA ALPHA
        </span>
      </div>

      {FOOTER_COLS.map((col) => (
        <div key={col.title} className="flex flex-col gap-3">
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{ opacity: 0.5 }}
          >
            {col.title}
          </span>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {col.links.map((link) => (
              <li
                key={link}
                className="text-sm cursor-pointer transition-colors hover:text-[#ff7759]"
                style={{ opacity: 0.78 }}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div
      className="max-w-360 mx-auto mt-14 pt-6 flex justify-between gap-6 text-xs"
      style={{ borderTop: '1px solid rgba(255,255,255,0.15)', opacity: 0.6 }}
    >
      <span>© 2026 Afisz · Polska</span>
      <span>Regulamin · Prywatność · Cookies · Kontakt</span>
    </div>
  </footer>
);
