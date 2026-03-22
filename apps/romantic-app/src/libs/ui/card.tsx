import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type CardProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Card = ({
  variant = 'primary',
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border border-(--card-border) bg-(--card-bg)',
        variant === 'primary' && 'shadow-(--card-shadow)',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
