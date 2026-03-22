import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type VideoProps = ComponentProps<'video'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Video = ({
  variant = 'primary',
  className,
  ...props
}: VideoProps) => {
  return <video className={cn('block', className)} {...props} />;
};
