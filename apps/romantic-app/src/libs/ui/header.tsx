import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type HeaderProps = ComponentProps<'header'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Header = ({
  variant = 'primary',
  className,
  ...props
}: HeaderProps) => {
  return <header className={cn('flex items-center', className)} {...props} />;
};
