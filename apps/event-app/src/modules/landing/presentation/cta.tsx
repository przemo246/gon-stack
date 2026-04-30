import { useState } from 'react';
import {
  MOCK_CTA_APP_BUTTONS,
  MOCK_CTA_NEWSLETTER_CITIES,
  MOCK_CTA_SUBTITLE,
} from './mock-data';

export const Cta = () => {
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(
    MOCK_CTA_NEWSLETTER_CITIES[0],
  );

  return (
    <section className="max-w-350 mx-auto mt-25 px-15 py-20 rounded-[28px] relative overflow-hidden grid grid-cols-[1.2fr_.8fr] gap-10 items-center bg-accent">
      <div>
        <h2 className="font-serif italic text-[88px] leading-[.95] m-0 tracking-tight text-text-inverse">
          Nie przegap{' '}
          <span className="inline-block bg-bg-inverse text-accent px-3.5 rounded-[10px] italic">
            niczego
          </span>
          .
        </h2>
        <p className="text-text-inverse/78 text-base mt-5 mb-8 max-w-115 leading-normal">
          {MOCK_CTA_SUBTITLE}
        </p>
        <div className="flex gap-3 flex-wrap">
          {MOCK_CTA_APP_BUTTONS.map((label) => (
            <button
              key={label}
              className="px-5.5 py-3.5 rounded-full text-[15px] text-text-inverse border border-text-inverse/30 cursor-pointer transition-all duration-160 ease-in-out hover:bg-text-inverse/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse/50"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-inverse/25 border border-text-inverse/16 rounded-[20px] p-6.5 backdrop-blur-xl">
        <div className="font-mono text-[11px] tracking-[.14em] text-text-inverse/60 mb-2.5">
          AFISZ · NEWSLETTER
        </div>
        <div className="flex gap-2 mb-3.5">
          <input
            placeholder="twój@email.pl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-text-inverse/12 border border-text-inverse/20 rounded-xl px-3.5 py-3 text-text-inverse text-sm flex-1 min-w-0 outline-none focus-visible:border-text-inverse/50 placeholder:text-text-inverse/50"
          />
        </div>
        <div className="flex gap-2 mb-3.5">
          <div className="relative flex-1">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none w-full bg-text-inverse/12 border border-text-inverse/20 rounded-xl px-3.5 pr-8 py-3 text-text-inverse text-sm cursor-pointer outline-none focus-visible:border-text-inverse/50"
            >
              {MOCK_CTA_NEWSLETTER_CITIES.map((city) => (
                <option key={city} className="text-black">
                  {city}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-1.5 fill-text-inverse/60 pointer-events-none"
              viewBox="0 0 10 6"
            >
              <path d="M5 6L0 0h10z" />
            </svg>
          </div>
          <button className="px-4.5 py-3 rounded-xl text-sm font-medium whitespace-nowrap bg-bg-inverse text-text-inverse cursor-pointer transition-all duration-160 ease-in-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse/50">
            Zapisz się →
          </button>
        </div>
        <div className="font-mono text-[11px] text-text-inverse/55 leading-normal tracking-[.02em]">
          ZAPISUJĄC SIĘ ZGADZASZ SIĘ Z REGULAMINEM.
          <br />
          MOŻESZ WYPISAĆ SIĘ KIEDY ZECHCESZ.
        </div>
      </div>
    </section>
  );
};
