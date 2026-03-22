import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SeparatorProps = ComponentProps<'hr'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Separator = ({
  variant = 'primary',
  className,
  ...props
}: SeparatorProps) => {
  return <hr className={cn('w-full border-t', className)} {...props} />;
};
