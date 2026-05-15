import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
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
        'inline-flex items-center justify-center gap-2',
        'text-sm font-medium',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && [
          'rounded-pill px-5.5 py-3',
          'bg-primary text-on-primary border-0',
        ],
        variant === 'secondary' && [
          'rounded-pill px-5.5 py-3',
          'bg-transparent text-ink border border-card-border',
          'hover:border-ink',
          'disabled:border-card-border',
        ],
        variant === 'ghost' && [
          'bg-transparent text-ink border-0 p-0',
          'border-b border-ink pb-0.5',
          'hover:text-coral hover:border-coral',
        ],
        className,
      )}
      {...props}
    />
  );
};
