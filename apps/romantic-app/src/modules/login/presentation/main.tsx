export const LoginForm = () => {
  return (
    <form
      id="login"
      className="auth-panel flex flex-col gap-4"
      method="post"
      action="/api/auth/login"
    >
      <h2 className="sr-only">Log in</h2>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-email"
          className="text-xs uppercase tracking-[0.14em] text-text-tertiary"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="variant-input w-full px-3 py-2.5 text-sm"
          autoComplete="email"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-password"
          className="text-xs uppercase tracking-[0.14em] text-text-tertiary"
        >
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="variant-input w-full px-3 py-2.5 text-sm"
          autoComplete="current-password"
          required
        />
      </div>
      <button
        type="submit"
        className="variant-button-primary w-full py-2.5 px-4 text-sm font-semibold uppercase tracking-[0.14em]"
      >
        Log in
      </button>
    </form>
  );
};

export const Main = () => {
  return (
    <main className="auth-page min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-[radial-gradient(circle_at_10%_50%,color-mix(in_srgb,var(--color-secondary-400)_35%,transparent)_0%,transparent_28%),radial-gradient(circle_at_90%_30%,color-mix(in_srgb,var(--color-primary-400)_35%,transparent)_0%,transparent_30%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px),linear-gradient(180deg,#0a0718_0%,#120c24_46%,#1a1133_100%)]">
      <div className="variant-card w-full max-w-sm p-6 md:p-8 flex flex-col gap-6">
        <header className="text-center flex flex-col gap-2">
          <div
            className="mx-auto w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl"
            aria-hidden="true"
          >
            💞
          </div>
          <h1 className="text-3xl font-heading font-semibold text-text-primary">
            Amoria
          </h1>
          <p className="text-sm text-text-secondary">
            Get closer, one question at a time.
          </p>
        </header>

        <form method="post" action="/api/auth/login">
          <input type="hidden" name="provider" value="google" />
          <button
            type="submit"
            className="variant-button-ghost w-full py-2.5 px-4 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-surface-200" />
          <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary">
            or
          </span>
          <span className="h-px flex-1 bg-surface-200" />
        </div>

        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-text-tertiary">
        Don&apos;t have an account?{' '}
        <a
          href="/register"
          className="text-primary-400 hover:text-primary-300 font-medium"
        >
          Create account
        </a>
      </p>
      <p className="mt-2 text-center text-xs text-text-tertiary">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </main>
  );
};
