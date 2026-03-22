import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ProgressIndicatorProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const ProgressIndicator = ({
  variant = 'primary',
  className,
  ...props
}: ProgressIndicatorProps) => {
  return <div className={cn('flex items-center', className)} {...props} />;
};
