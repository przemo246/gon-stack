import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'ghost-with-border' | 'ghost' | 'solid';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Button = ({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full px-6 py-3.5',
        'font-sans text-sm font-medium',
        'cursor-pointer disabled:cursor-not-allowed',
        variant === 'primary' && [
          'bg-accent text-text-inverse',
          'disabled:bg-bg-surface-alt disabled:text-text-muted disabled:shadow-none',
        ],
        variant === 'ghost-with-border' && [
          'border border-border-strong bg-transparent text-text-primary',
          'hover:bg-[rgba(0,0,0,.03)]',
          'disabled:border-border-default disabled:text-text-muted',
        ],
        variant === 'ghost' && [
          'bg-transparent text-text-primary',
          'hover:bg-[rgba(0,0,0,.03)]',
          'disabled:text-text-muted',
        ],
        variant === 'solid' && [
          'bg-[#131219] text-text-inverse',
          'disabled:bg-bg-surface-alt disabled:text-text-muted',
        ],
        className,
      )}
      {...props}
    />
  );
};
