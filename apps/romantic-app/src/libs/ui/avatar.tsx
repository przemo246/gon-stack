import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type AvatarProps = ComponentProps<'span'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Avatar = ({ className, ...props }: AvatarProps) => {
  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    />
  );
};
