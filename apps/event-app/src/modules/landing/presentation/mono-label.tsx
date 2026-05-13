import type { ReactNode } from 'react';

type MonoLabelProps = {
  children: ReactNode;
  className?: string;
};

export const MonoLabel = ({ children, className = '' }: MonoLabelProps) => (
  <span
    className={`font-mono text-[11px] tracking-[0.18em] uppercase text-muted ${className}`}
  >
    {children}
  </span>
);
