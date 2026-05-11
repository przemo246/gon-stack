import type { User } from '@supabase/supabase-js';

type HeaderProps = {
  user: User | null;
};

const NAV_LINKS = ['Główna', 'Przeglądaj', 'Kalendarz', 'Dla organizatorów'];

function getInitials(user: User): string {
  const name = (user.user_metadata?.full_name ?? user.user_metadata?.name) as
    | string
    | undefined;
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
  return user.email ? user.email.substring(0, 2).toUpperCase() : '';
}

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11l-1 0Z" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

export const Header = ({ user }: HeaderProps) => (
  <header
    className="sticky top-0 z-50 border-b border-border-default"
    style={{
      background: 'color-mix(in srgb, var(--color-bg-base) 85%, transparent)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <div
      className="max-w-360 mx-auto px-8 py-3.5 grid items-center gap-8"
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
    >
      {/* Logo */}
      <button className="inline-flex items-center gap-2 bg-transparent border-0 p-0 text-text-primary">
        <span className="w-7 h-7 rounded-lg bg-bg-inverse text-text-inverse inline-flex items-center justify-center font-sans font-bold text-base">
          A
        </span>
        <span className="font-sans font-semibold text-[22px] tracking-[-0.02em]">
          Afisz
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted ml-1">
          POLSKA
        </span>
      </button>

      {/* Nav */}
      <nav className="flex gap-7 justify-center">
        {NAV_LINKS.map((label, i) => (
          <button
            key={label}
            className="bg-transparent border-x-0 border-t-0 text-text-primary text-sm py-2 transition-colors hover:text-accent"
            style={{
              borderBottom:
                i === 0
                  ? '1.5px solid currentColor'
                  : '1.5px solid transparent',
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex gap-2 items-center">
        <button
          aria-label="Przełącz motyw"
          className="bg-bg-surface border border-border-default rounded-full w-9 h-9 inline-flex items-center justify-center text-text-primary"
        >
          <MoonIcon />
        </button>

        <button className="inline-flex gap-2 items-center bg-bg-surface border border-border-default rounded-full px-3.5 py-2 text-text-primary text-[13px]">
          <HeartIcon />
          Zapisane
          <span className="bg-accent text-white rounded-full min-w-5 h-5 inline-flex items-center justify-center font-mono text-[11px] px-1.5">
            0
          </span>
        </button>

        <button className="bg-bg-inverse text-text-inverse border-0 rounded-full px-3.5 py-2 inline-flex gap-2 items-center text-[13px]">
          {user ? (
            <span>{getInitials(user)}</span>
          ) : (
            <>
              <UserIcon />
              <span>Konto</span>
            </>
          )}
        </button>
      </div>
    </div>
  </header>
);
