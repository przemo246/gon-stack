import { MonoLabel } from './mono-label';

export const ManifestBand = () => (
  <section className="bg-deep-green text-on-dark py-20 px-8 rounded-lg mx-8 mt-8 mb-0">
    <div className="max-w-[1280px] mx-auto">
      <MonoLabel style={{ color: 'var(--color-coral)' }}>
        AFISZ · MANIFEST
      </MonoLabel>
      <h2
        className="font-display font-medium leading-[1.0] tracking-[-0.03em] mt-4 mb-14 max-w-[14ch]"
        style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}
      >
        Nie sprzedajemy biletów.
        <br />
        Pomagamy je <em className="not-italic text-coral">znaleźć</em>.
      </h2>
      <div className="grid grid-cols-1 gap-8 border-t border-white/20 pt-8 lg:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          <MonoLabel style={{ color: 'var(--color-coral)' }}>
            01 · OTWARTOŚĆ
          </MonoLabel>
          <p className="text-white/80 text-base leading-relaxed m-0">
            Każde wydarzenie w Polsce — duże i małe, klubowe i stadionowe — w
            jednym miejscu, bez priorytetu dla płacących.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <MonoLabel style={{ color: 'var(--color-coral)' }}>
            02 · LOKALNOŚĆ
          </MonoLabel>
          <p className="text-white/80 text-base leading-relaxed m-0">
            Filtrujesz po mieście, dzielnicy, dniu tygodnia. Afisz pokaże ci, co
            dzieje się dziś za rogiem i w sąsiednim województwie.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <MonoLabel style={{ color: 'var(--color-coral)' }}>
            03 · BEZ POŚREDNIKÓW
          </MonoLabel>
          <p className="text-white/80 text-base leading-relaxed m-0">
            Klikasz „Idę", organizator widzi zainteresowanie. Sprzedaż biletów
            odbywa się u źródła — nie u nas.
          </p>
        </div>
      </div>
    </div>
  </section>
);
