import { useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { Button } from '@/libs/ui/button';
import { AuthModal } from './auth-modal';
import { Logo } from './logo';
import { Navigation } from './navigation';
import { UserProfile } from './user-profile';
import { Plus } from 'lucide-react';

type HeaderProps = {
  user: User | null;
};

export const Header = ({ user }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [initialView, setInitialView] = useState<'login' | 'register'>('login');
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-[14px] border-b border-border-default">
        <div className="max-w-350 mx-auto px-9 py-4 flex items-center gap-10">
          <Logo />
          <Navigation />
          <div className="ml-auto flex gap-2.5 items-center">
            {user ? (
              <div className="flex items-center justify-center gap-3">
                <Button
                  className="px-4 py-2.5 flex items-center justify-center gap-1"
                  variant="solid"
                >
                  <Plus size={18} />
                  Dodaj wydarzenie
                </Button>
                <UserProfile user={user} />
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(true)}
                  className="px-4 py-2.5"
                >
                  Zaloguj
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setInitialView('register');
                    setOpen(true);
                  }}
                  className="px-4.5 py-2.5"
                >
                  Załóż konto
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      {open && <AuthModal setOpen={setOpen} initialView={initialView} />}
    </>
  );
};
