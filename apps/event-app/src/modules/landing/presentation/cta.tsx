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
        <h2 className="font-serif italic text-[88px] leading-[.95] m-0 tracking-tight text-white">
          Nie przegap{' '}
          <span className="inline-block bg-bg-inverse text-accent px-3.5 rounded-[10px] italic">
            niczego
          </span>
          .
        </h2>
        <p className="text-white/78 text-base mt-5 mb-8 max-w-115 leading-normal">
          {MOCK_CTA_SUBTITLE}
        </p>
        <div className="flex gap-3 flex-wrap">
          {MOCK_CTA_APP_BUTTONS.map((label) => (
            <button
              key={label}
              className="px-5.5 py-3.5 rounded-full text-[15px] text-white border border-white/30 cursor-pointer hover:bg-white/8"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black/25 border border-white/16 rounded-[20px] p-6.5 backdrop-blur-xl">
        <div className="font-mono text-[11px] tracking-[.14em] text-white/60 mb-2.5">
          AFISZ · NEWSLETTER
        </div>
        <div className="flex gap-2 mb-3.5">
          <input
            placeholder="twój@email.pl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/12 border border-white/20 rounded-xl px-3.5 py-3 text-white text-sm flex-1 min-w-0 outline-none focus:border-white/50 placeholder:text-white/50"
          />
        </div>
        <div className="flex gap-2 mb-3.5">
          <div className="relative flex-1">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none w-full bg-white/12 border border-white/20 rounded-xl px-3.5 pr-8 py-3 text-white text-sm cursor-pointer focus:outline-none"
            >
              {MOCK_CTA_NEWSLETTER_CITIES.map((city) => (
                <option key={city} className="text-black">
                  {city}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-1.5 fill-white/60 pointer-events-none"
              viewBox="0 0 10 6"
            >
              <path d="M5 6L0 0h10z" />
            </svg>
          </div>
          <button className="px-4.5 py-3 rounded-xl text-sm font-medium whitespace-nowrap bg-bg-inverse text-white cursor-pointer">
            Zapisz się →
          </button>
        </div>
        <div className="font-mono text-[11px] text-white/55 leading-normal tracking-[.02em]">
          ZAPISUJĄC SIĘ ZGADZASZ SIĘ Z REGULAMINEM.
          <br />
          MOŻESZ WYPISAĆ SIĘ KIEDY ZECHCESZ.
        </div>
      </div>
    </section>
  );
};
