import { Router } from './router';

export const Main = () => {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-[radial-gradient(circle_at_10%_50%,color-mix(in_srgb,var(--color-secondary-400)_35%,transparent)_0%,transparent_28%),radial-gradient(circle_at_90%_30%,color-mix(in_srgb,var(--color-primary-400)_35%,transparent)_0%,transparent_30%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px),linear-gradient(180deg,#0a0718_0%,#120c24_46%,#1a1133_100%)]">
      <div className="mx-auto w-full max-w-6xl py-6 md:py-10">
        <Router />
      </div>
    </main>
  );
};
