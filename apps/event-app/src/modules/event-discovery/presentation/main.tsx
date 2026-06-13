import { useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { Provider } from './context';
import { Header } from './header';
import { Landing } from './landing';
import { Footer } from './footer';

type MainProps = {
  user: User | null;
};

const Content = ({ user }: MainProps) => {
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-canvas min-h-screen text-ink">
      <Header activePage="home" savedCount={savedSet.size} user={user} />
      <main>
        <Landing savedSet={savedSet} onToggleSave={toggleSave} />
      </main>
      <Footer />
    </div>
  );
};

export const Main = ({ user }: MainProps) => (
  <Provider>
    <Content user={user} />
  </Provider>
);
