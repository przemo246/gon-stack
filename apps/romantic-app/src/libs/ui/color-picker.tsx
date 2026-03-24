import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ColorPickerProps = ComponentProps<'input'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const ColorPicker = ({ className, ...props }: ColorPickerProps) => {
  return <input type="color" className={cn('size-8', className)} {...props} />;
};
