import { type ComponentProps } from 'react';

import { clsx } from 'clsx';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'pill-outline';
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
      className={clsx(
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'pill-outline' && 'btn-pill-outline',
        className,
      )}
      {...props}
    />
  );
};
