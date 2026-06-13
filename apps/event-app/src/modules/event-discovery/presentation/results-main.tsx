import { useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { Provider } from './context';
import { Header } from './header';
import { Footer } from './footer';
import { ResultsPage } from './results-page';

type ResultsMainProps = {
  user: User | null;
};

const Content = ({ user }: ResultsMainProps) => {
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
      <Header activePage="results" savedCount={savedSet.size} user={user} />
      <main>
        <ResultsPage onToggleSave={toggleSave} savedSet={savedSet} />
      </main>
      <Footer />
    </div>
  );
};

export const ResultsMain = ({ user }: ResultsMainProps) => (
  <Provider>
    <Content user={user} />
  </Provider>
);
