import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { CATEGORIES, CITIES } from './mock-data';

export interface SearchValue {
  name: string;
  category: string;
  city: string;
  date: string;
}

type SearchBarProps = {
  value: SearchValue;
  onChange: (value: SearchValue) => void;
  onSubmit: () => void;
  variant?: 'hero' | 'compact';
};

const DATE_PRESETS: [string, string][] = [
  ['', 'Dowolna data'],
  ['today', 'Dziś'],
  ['weekend', 'Ten weekend'],
  ['week', 'Ten tydzień'],
  ['month', 'Ten miesiąc'],
  ['summer', 'Lato 2026'],
];

function getDateLabel(key: string) {
  return DATE_PRESETS.find(([k]) => k === key)?.[1] ?? 'Dowolna data';
}

function getCategoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? 'Wszystkie';
}

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  variant = 'hero',
}: SearchBarProps) => {
  const [openField, setOpenField] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const compact = variant === 'compact';

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenField(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const set = (k: keyof SearchValue, v: string) =>
    onChange({ ...value, [k]: v });

  const fieldPad = compact ? 'px-4 py-2.5' : 'px-4.5 py-3.5';

  return (
    <div
      ref={wrapRef}
      className="bg-bg-base border border-border-default rounded-[22px] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.18)]"
    >
      <div className="grid grid-cols-[1.2fr_1px_1fr_1px_1fr_1px_1fr_auto] items-stretch">
        <div
          className={`relative flex flex-col gap-1 cursor-text ${fieldPad} ${openField === 'name' ? 'bg-bg-surface rounded-l-[22px]' : ''}`}
          onClick={() => setOpenField('name')}
        >
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted">
            Wydarzenie
          </span>
          <input
            type="text"
            placeholder="Artysta, drużyna, tytuł…"
            value={value.name}
            onChange={(e) => set('name', e.target.value)}
            onFocus={() => setOpenField('name')}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            className={`bg-transparent border-0 outline-0 font-sans text-text-primary placeholder:text-text-muted w-full ${compact ? 'text-sm' : 'text-base'}`}
          />
        </div>

        <div className="bg-border-default my-3.5" />

        <DropdownField
          label="Kategoria"
          displayValue={getCategoryLabel(value.category)}
          isOpen={openField === 'category'}
          compact={compact}
          onClick={() =>
            setOpenField(openField === 'category' ? null : 'category')
          }
        >
          <DropdownItem
            active={!value.category}
            onClick={() => {
              set('category', '');
              setOpenField(null);
            }}
          >
            Wszystkie kategorie
          </DropdownItem>
          {CATEGORIES.map((c) => (
            <DropdownItem
              key={c.id}
              active={value.category === c.id}
              onClick={() => {
                set('category', c.id);
                setOpenField(null);
              }}
            >
              <span>{c.label}</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-text-muted">
                {c.mono}
              </span>
            </DropdownItem>
          ))}
        </DropdownField>

        <div className="bg-border-default my-3.5" />

        <DropdownField
          label="Lokalizacja"
          displayValue={value.city || 'Cała Polska'}
          isOpen={openField === 'city'}
          compact={compact}
          onClick={() => setOpenField(openField === 'city' ? null : 'city')}
        >
          <DropdownItem
            active={!value.city}
            onClick={() => {
              set('city', '');
              setOpenField(null);
            }}
          >
            Cała Polska
          </DropdownItem>
          {CITIES.map((c) => (
            <DropdownItem
              key={c}
              active={value.city === c}
              onClick={() => {
                set('city', c);
                setOpenField(null);
              }}
            >
              {c}
            </DropdownItem>
          ))}
        </DropdownField>

        <div className="bg-border-default my-3.5" />

        <DropdownField
          label="Data"
          displayValue={getDateLabel(value.date)}
          isOpen={openField === 'date'}
          compact={compact}
          onClick={() => setOpenField(openField === 'date' ? null : 'date')}
        >
          {DATE_PRESETS.map(([k, label]) => (
            <DropdownItem
              key={k || 'any'}
              active={value.date === k}
              onClick={() => {
                set('date', k);
                setOpenField(null);
              }}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownField>

        <button
          onClick={onSubmit}
          className="m-2.5 bg-text-primary text-bg-base border-0 rounded-[18px] px-5 font-sans text-sm font-medium inline-flex items-center gap-2.5 min-h-14 whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Search size={16} />
          Szukaj
        </button>
      </div>
    </div>
  );
};

type DropdownFieldProps = {
  label: string;
  displayValue: string;
  isOpen: boolean;
  compact: boolean;
  onClick: () => void;
  children: ReactNode;
};

const DropdownField = ({
  label,
  displayValue,
  isOpen,
  compact,
  onClick,
  children,
}: DropdownFieldProps) => (
  <div
    className={`relative flex flex-col gap-1 ${compact ? 'px-4 py-2.5' : 'px-4.5 py-3.5'} ${isOpen ? 'bg-bg-surface' : ''} cursor-pointer`}
    onClick={onClick}
  >
    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted">
      {label}
    </span>
    <button className="bg-transparent border-0 outline-0 font-sans text-text-primary w-full text-left flex items-center justify-between gap-2 cursor-pointer text-base p-0">
      <span>{displayValue}</span>
      <ChevronDown size={10} />
    </button>
    {isOpen && (
      <div
        className="absolute top-full left-0 right-0 min-w-60 bg-bg-base border border-border-default rounded-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2)] z-30 max-h-80 overflow-y-auto p-1.5 mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    )}
  </div>
);

type DropdownItemProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

const DropdownItem = ({ active, onClick, children }: DropdownItemProps) => (
  <button
    className={`flex items-center justify-between gap-3 w-full border-0 px-3 py-2.5 rounded-[10px] text-sm text-left cursor-pointer ${
      active
        ? 'bg-text-primary text-bg-base'
        : 'bg-transparent text-text-primary hover:bg-bg-surface'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
