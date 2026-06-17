import { Heart } from 'lucide-react';

import { Logo } from '@/libs/ui/logo';
import { Button } from '@/libs/ui/button';
import type { User } from '@supabase/supabase-js';
import { UserProfile } from '@/shared/user-profile/presentation/user-profile';

type ActivePage = 'home' | 'results' | 'details';

type HeaderProps = {
  activePage: ActivePage;
  savedCount: number;
  user: User | null;
};

export const Header = ({ activePage, savedCount, user }: HeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-md">
    <div className="max-w-360 mx-auto px-8 py-3.5 grid gap-8 items-center grid-cols-[auto_1fr_auto]">
      {/* Logo */}
      <Logo href="/" />

      {/* Nav */}
      <nav className="flex gap-7 justify-center">
        <Button
          variant="ghost"
          className={`py-2 ${activePage === 'home' ? 'border-ink' : 'border-transparent'}`}
          href="/"
        >
          Główna
        </Button>
        <Button
          variant="ghost"
          className={`py-2 ${activePage === 'results' ? 'border-ink' : 'border-transparent'}`}
          href="/results"
        >
          Przeglądaj
        </Button>
        <Button variant="ghost" className="border-transparent">
          Kalendarz
        </Button>
      </nav>

      {/* Right */}
      {user ? (
        <div className="flex gap-2 items-center">
          {/* <LightDarkModeSwitchButton /> */}
          <Button
            variant="tertiary"
            className="px-0 py-0 h-10 w-10 bg-surface hover:bg-primary hover:border-primary relative"
          >
            {savedCount > 0 && (
              <span className="bg-coral text-white rounded-full min-w-5 h-5 inline-flex items-center justify-center font-mono text-[11px] px-1.5 absolute -left-2.5 -top-1.25 pt-px">
                {savedCount}
              </span>
            )}
            <Heart size={14} />
          </Button>
          <UserProfile />
          <Button variant="primary" href="/event/create" className="h-10">
            Dodaj wydarzenie
          </Button>
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
