import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type BadgeProps = ComponentProps<'span'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Badge = ({
  variant = 'primary',
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'rounded-full',
        'font-medium uppercase',
        variant === 'primary' && [
          'px-2.5 py-1',
          'text-[0.6875rem] tracking-[0.11em] text-(--badge-primary-text)',
          'border border-(--badge-primary-border) bg-(--badge-primary-bg)',
        ],
        variant === 'secondary' && [
          'px-2.5 py-1',
          'text-[0.6875rem] tracking-[0.11em] text-(--badge-secondary-text)',
          'border border-(--badge-secondary-border) bg-(--badge-secondary-bg)',
        ],
        className,
      )}
      {...props}
    />
  );
};
