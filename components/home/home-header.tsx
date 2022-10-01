import cn from 'clsx';
import type { ReactNode } from 'react';

type HomeHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function HomeHeader({
  children,
  className
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 bg-black/60 px-4 py-2 backdrop-blur-md',
        className ?? 'flex items-center justify-between'
      )}
    >
      {children}
    </header>
  );
}
