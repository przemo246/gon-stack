import { Moon, UserRound, Heart } from 'lucide-react';

import { Text } from '@/libs/ui/text';
import type { User } from '@supabase/supabase-js';

export type Route = 'home' | 'results' | 'details';

type HeaderProps = {
  route: Route;
  onNavigate: (route: Route) => void;
  savedCount: number;
  user: User | null;
};

type NavButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const NavButton = ({ label, active, onClick }: NavButtonProps) => (
  <button
    className={`bg-transparent border-0 text-ink text-sm py-2 border-b-[1.5px] transition-colors hover:text-coral ${active ? 'border-ink' : 'border-transparent'}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const Header = ({ route, onNavigate, savedCount }: HeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-md">
    <div className="max-w-360 mx-auto px-8 py-3.5 grid gap-8 items-center grid-cols-[auto_1fr_auto]">
      {/* Logo */}
      <button
        className="inline-flex items-center gap-2 bg-transparent border-0 p-0 text-ink"
        onClick={() => onNavigate('home')}
      >
        <span className="w-7 h-7 rounded-sm bg-primary text-on-primary inline-flex items-center justify-center font-display font-bold text-base">
          A
        </span>
        <Text.LogoWordmark>Afisz</Text.LogoWordmark>
      </button>

      {/* Nav */}
      <nav className="flex gap-7 justify-center">
        <NavButton
          label="Główna"
          active={route === 'home'}
          onClick={() => onNavigate('home')}
        />
        <NavButton
          label="Przeglądaj"
          active={route === 'results'}
          onClick={() => onNavigate('results')}
        />
        <NavButton label="Kalendarz" active={false} onClick={() => {}} />
        <NavButton
          label="Dla organizatorów"
          active={false}
          onClick={() => {}}
        />
      </nav>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <button className="bg-surface border border-card-border-c rounded-full inline-flex justify-center items-center text-ink text-sm hover:bg-primary hover:text-on-primary transition-colors w-10 h-10">
          <Moon size={14} />
        </button>
        <button
          className="bg-surface border border-card-border-c rounded-full px-3.5 py-2 inline-flex gap-2 items-center text-ink text-sm hover:bg-primary hover:text-on-primary transition-colors h-10"
          onClick={() => onNavigate('results')}
        >
          <Heart size={14} />
          Zapisane
          {savedCount > 0 && (
            <span className="bg-coral text-white rounded-full min-w-5 h-5 inline-flex items-center justify-center font-mono text-[11px] px-1.5">
              {savedCount}
            </span>
          )}
        </button>
        <button className="bg-primary text-on-primary border-0 rounded-full inline-flex justify-center items-center text-sm hover:opacity-90 transition-opacity h-10 w-10">
          <UserRound size={14} />
        </button>
      </div>
    </div>
  </header>
);
