import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

import { createHookContext } from '@/libs/power-context';
import { cn } from './cn';

/* =============================================================================
 * Shared Types
 * ============================================================================= */

type DropdownContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

/* =============================================================================
 * Context
 * ============================================================================= */

const [DropdownProvider, useDropdownContext] = createHookContext(
  'Dropdown',
  (value: DropdownContextValue) => value,
);

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type DropdownRootProps = { children: ReactNode; className?: string };
export type DropdownTriggerProps = { children: ReactNode; className?: string };
export type DropdownContentProps = ComponentProps<'div'>;
export type DropdownItemProps = ComponentProps<'button'>;

/* =============================================================================
 * Root
 * ============================================================================= */

export const DropdownRoot = ({ children, className }: DropdownRootProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <DropdownProvider
      value={{
        open,
        toggle: () => setOpen((v) => !v),
        close: () => setOpen(false),
      }}
    >
      <div ref={ref} className={cn('relative', className)}>
        {children}
      </div>
    </DropdownProvider>
  );
};

/* =============================================================================
 * Trigger
 * ============================================================================= */

export const DropdownTrigger = ({
  children,
  className,
}: DropdownTriggerProps) => {
  const { toggle } = useDropdownContext();
  return (
    <div className={cn('cursor-pointer', className)} onClick={toggle}>
      {children}
    </div>
  );
};

/* =============================================================================
 * Content
 * ============================================================================= */

export const DropdownContent = ({
  className,
  children,
  ...props
}: DropdownContentProps) => {
  const { open } = useDropdownContext();
  if (!open) return null;
  return (
    <div
      className={cn(
        'absolute right-0 top-full z-50 mt-1.5',
        'min-w-40 rounded-xl border border-border-default bg-bg-base shadow-1',
        'py-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* =============================================================================
 * Item
 * ============================================================================= */

export const DropdownItem = ({
  className,
  onClick,
  children,
  ...props
}: DropdownItemProps) => {
  const { close } = useDropdownContext();
  return (
    <button
      className={cn(
        'flex w-full items-center px-4 py-2.5',
        'font-sans text-sm text-text-primary',
        'hover:bg-bg-surface transition-colors',
        className,
      )}
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

/* =============================================================================
 * Compound Export
 * ============================================================================= */

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};
