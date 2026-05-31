import { Heart } from 'lucide-react';

import { Logo } from '@/libs/ui/logo';
import { Button } from '@/libs/ui/button';
import type { User } from '@supabase/supabase-js';
import { UserProfile } from '@/shared/user-profile/presentation/user-profile';
import { LightDarkModeSwitchButton } from './light-dark-mode-switch-button';

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

export const Header = ({
  route,
  onNavigate,
  savedCount,
  user,
}: HeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-md">
    <div className="max-w-360 mx-auto px-8 py-3.5 grid gap-8 items-center grid-cols-[auto_1fr_auto]">
      {/* Logo */}
      <Logo href="/" />

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
      {user ? (
        <div className="flex gap-2 items-center">
          <LightDarkModeSwitchButton />
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
          <UserProfile />
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="primary" href="/login">
            Zaloguj się
          </Button>
          <Button variant="secondary" href="/register">
            Zarejestruj się
          </Button>
        </div>
      )}
    </div>
  </header>
);
