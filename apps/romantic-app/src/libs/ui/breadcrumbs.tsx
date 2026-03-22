import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type BreadcrumbsProps = ComponentProps<'nav'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Breadcrumbs = ({
  variant = 'primary',
  className,
  ...props
}: BreadcrumbsProps) => {
  return <nav className={cn('flex items-center', className)} {...props} />;
};
