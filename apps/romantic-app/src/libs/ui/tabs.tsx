import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type TabsProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Tabs = ({ className, ...props }: TabsProps) => {
  return <div className={cn('flex flex-col', className)} {...props} />;
};
