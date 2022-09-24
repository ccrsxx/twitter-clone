import cn from 'clsx';
import type { ReactNode } from 'react';

type HomeHeaderProps = {
  className?: string;
  children: ReactNode;
};

export function HomeHeader({
  className,
  children
}: HomeHeaderProps): JSX.Element {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-black/60 px-4 py-2 backdrop-blur-md',
        className ?? 'flex items-center justify-between'
      )}
    >
      {children}
    </div>
  );
}
