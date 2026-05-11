import type { CSSProperties, ReactNode } from 'react';

type MonoLabelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const MonoLabel = ({
  children,
  className = '',
  style,
}: MonoLabelProps) => (
  <span
    className={`font-mono text-[11px] tracking-[0.18em] uppercase text-muted ${className}`}
    style={style}
  >
    {children}
  </span>
);
