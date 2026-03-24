import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SearchInputProps = ComponentProps<'input'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <input
      type="search"
      className={cn('inline-flex items-center', className)}
      {...props}
    />
  );
};
