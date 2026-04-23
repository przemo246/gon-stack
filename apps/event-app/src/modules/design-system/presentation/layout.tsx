import { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[28%_1fr]">
      {children}
    </div>
  );
};
