import { Link } from '@/libs/ui/link';
import { Text } from '@/libs/ui/text';
import { Starter } from './starter';

const userEmail = 'tom@wp.pl';

const navItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
] as const;

export const Main = () => {
  return (
    <div className="page-bg min-h-screen text-text-primary">
      <nav className="sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--color-primary-500)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-0)_88%,transparent)] shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary-500)_30%,transparent)] backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-4 px-3 py-3 tn:px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-500/25 text-base"
              aria-hidden="true"
            >
              💞
            </div>
            <Text.T5 as="span" className="truncate text-text-primary">
              Amoria
            </Text.T5>
          </div>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                variant="secondary"
                className={[
                  'inline-flex items-center justify-center rounded-lg px-2.5 py-1.5 no-underline transition-all duration-150 hover:no-underline',
                  idx === 0
                    ? 'bg-[linear-gradient(120deg,var(--color-primary-500),var(--color-secondary-500))] text-white shadow-[0_0_12px_color-mix(in_srgb,var(--color-secondary-400)_60%,transparent)]'
                    : 'text-text-tertiary hover:bg-[color-mix(in_srgb,var(--color-primary-500)_24%,transparent)] hover:text-white hover:shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary-500)_55%,transparent)]',
                ].join(' ')}
              >
                <Text.B2 as="span">{item.label}</Text.B2>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Text.B3
              as="span"
              className="hidden max-w-[180px] truncate rounded-lg border border-[color-mix(in_srgb,#ffffff_16%,transparent)] bg-[color-mix(in_srgb,#ffffff_5%,transparent)] px-3 py-1.5 text-text-tertiary sm:inline-flex"
              title={userEmail}
            >
              {userEmail}
            </Text.B3>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary transition-all duration-150 hover:bg-[color-mix(in_srgb,var(--color-primary-500)_24%,transparent)] hover:text-white hover:shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary-500)_55%,transparent)]"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col">
          <div className="flex-1 px-3 pb-8 pt-6 tn:px-4 sm:px-6 sm:pt-9 lg:px-8">
            <Starter />
          </div>

          <div className="px-3 tn:px-4 sm:px-6 lg:px-8">
            <div className="h-px w-full bg-secondary-300/35" />
          </div>

          <footer className="px-3 pb-4 pt-4 tn:px-4 sm:px-6 lg:px-8">
            <Text.B2 as="p" className="text-center">
              Have questions? Check out{' '}
              <Link
                href="#"
                variant="primary"
                className="text-primary-300 underline underline-offset-2 hover:text-primary-200"
              >
                how it works
              </Link>{' '}
              or{' '}
              <Link
                href="#"
                variant="primary"
                className="text-primary-300 underline underline-offset-2 hover:text-primary-200"
              >
                contact support
              </Link>
              .
            </Text.B2>
          </footer>
        </div>
      </main>
    </div>
  );
};
