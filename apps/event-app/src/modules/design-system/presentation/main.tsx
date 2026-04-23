import { Router } from './router';

export const Main = () => {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl py-6 md:py-10">
        <Router />
      </div>
    </main>
  );
};
