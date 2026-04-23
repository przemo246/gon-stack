import {
  MOCK_FOOTER_CITIES_LINE,
  MOCK_FOOTER_COPYRIGHT,
  MOCK_FOOTER_LEGAL_LINKS,
  MOCK_FOOTER_SECTIONS,
  MOCK_FOOTER_TAGLINE,
} from './mock-data';

export const Footer = () => {
  return (
    <>
      <footer className="max-w-350 mx-auto mt-20 px-9 pt-15 pb-10 border-t border-border-default grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-12">
        <div>
          <span className="font-serif text-[44px] italic">Afisz</span>
          <p className="text-sm text-text-muted max-w-60 leading-normal mt-3.5 mb-5">
            {MOCK_FOOTER_TAGLINE}
          </p>
          <div className="font-mono text-[11px] tracking-widest text-text-muted">
            {MOCK_FOOTER_CITIES_LINE}
          </div>
        </div>

        {MOCK_FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h4 className="font-mono text-[11px] tracking-[.14em] text-text-muted m-0 mb-3.5 font-normal uppercase">
              {section.title}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 text-sm">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="cursor-pointer hover:text-accent transition-colors"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </footer>

      <div className="max-w-350 mx-auto px-9 py-5 pb-10 flex justify-between font-mono text-[11px] tracking-widest text-text-muted uppercase">
        <div>{MOCK_FOOTER_COPYRIGHT}</div>
        <div>{MOCK_FOOTER_LEGAL_LINKS.join(' · ')}</div>
      </div>
    </>
  );
};
