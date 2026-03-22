import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type TreeViewProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const TreeView = ({
  variant = 'primary',
  className,
  ...props
}: TreeViewProps) => {
  return (
    <div role="tree" className={cn('flex flex-col', className)} {...props} />
  );
};
