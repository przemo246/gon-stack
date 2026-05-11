import { useState } from 'react';

import { Button } from '@/libs/ui/button';
import { Modal } from '@/libs/ui/modal';
import { Text } from '@/libs/ui/text';

/* =============================================================================
 * Shared
 * ============================================================================= */

const GoogleButton = () => (
  <>
    <input type="hidden" name="provider" value="google" />
    <Button type="submit" variant="ghost-with-border" className="w-full gap-2">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
          fill="#EA4335"
        />
      </svg>
      Kontynuuj z Google
    </Button>
  </>
);

const Divider = () => (
  <div className="flex items-center gap-3 my-4">
    <div className="h-px flex-1 bg-border-default" />
    <span className="font-sans text-sm text-text-muted">lub</span>
    <div className="h-px flex-1 bg-border-default" />
  </div>
);

const inputClassName =
  'w-full rounded-xl border border-border-strong bg-bg-base px-4 py-3 font-sans text-sm text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent transition-colors duration-160';

const SwitchLink = ({
  prompt,
  label,
  onSwitch,
}: {
  prompt: string;
  label: string;
  onSwitch: () => void;
}) => (
  <p className="text-center font-sans text-sm text-text-muted">
    {prompt}{' '}
    <button
      type="button"
      onClick={onSwitch}
      className="font-medium text-text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-sm"
    >
      {label}
    </button>
  </p>
);

/* =============================================================================
 * Login Form
 * ============================================================================= */

type FormProps = {
  onSwitch: () => void;
};

const LoginForm = ({ onSwitch }: FormProps) => (
  <form
    id="login"
    className="flex flex-col gap-4"
    method="post"
    action="/api/auth/login"
  >
    <GoogleButton />
    <Divider />

    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="login-email"
        className="font-sans text-sm font-medium text-text-primary"
      >
        Adres e-mail
      </label>
      <input
        id="login-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="ty@przykład.pl"
        className={inputClassName}
        required
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="login-password"
        className="font-sans text-sm font-medium text-text-primary"
      >
        Hasło
      </label>
      <input
        id="login-password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        className={inputClassName}
        required
      />
    </div>

    <Button type="submit" variant="primary" className="mt-1 w-full">
      Zaloguj się
    </Button>

    <SwitchLink
      prompt="Nie masz konta?"
      label="Zarejestruj się"
      onSwitch={onSwitch}
    />
  </form>
);

/* =============================================================================
 * Register Form
 * ============================================================================= */

const RegisterForm = ({ onSwitch }: FormProps) => (
  <form
    id="register"
    className="flex flex-col gap-4"
    method="post"
    action="/api/auth/register"
  >
    <GoogleButton />
    <Divider />

    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="register-email"
        className="font-sans text-sm font-medium text-text-primary"
      >
        Adres e-mail
      </label>
      <input
        id="register-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="ty@przykład.pl"
        className={inputClassName}
        required
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="register-password"
        className="font-sans text-sm font-medium text-text-primary"
      >
        Hasło
      </label>
      <input
        id="register-password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        className={inputClassName}
        required
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="register-confirm-password"
        className="font-sans text-sm font-medium text-text-primary"
      >
        Potwierdź hasło
      </label>
      <input
        id="register-confirm-password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        className={inputClassName}
        required
      />
    </div>

    <Button type="submit" variant="primary" className="mt-1 w-full">
      Zarejestruj się
    </Button>

    <SwitchLink
      prompt="Masz już konto?"
      label="Zaloguj się"
      onSwitch={onSwitch}
    />
  </form>
);

/* =============================================================================
 * Auth Modal
 * ============================================================================= */

type AuthModalProps = {
  setOpen: (v: boolean) => void;
  initialView?: 'login' | 'register';
};

export const AuthModal = ({
  setOpen,
  initialView = 'login',
}: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);

  return (
    <Modal onClose={() => setOpen(false)}>
      <Modal.Header onClose={() => setOpen(false)}>
        <Text.T5>
          {view === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
        </Text.T5>
      </Modal.Header>
      <Modal.Body>
        {view === 'login' ? (
          <LoginForm onSwitch={() => setView('register')} />
        ) : (
          <RegisterForm onSwitch={() => setView('login')} />
        )}
      </Modal.Body>
    </Modal>
  );
};
