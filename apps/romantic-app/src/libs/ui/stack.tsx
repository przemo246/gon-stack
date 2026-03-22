import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type StackProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Stack = ({
  variant = 'primary',
  className,
  ...props
}: StackProps) => {
  return <div className={cn('flex flex-col', className)} {...props} />;
};
