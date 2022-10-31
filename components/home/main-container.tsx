import cn from 'clsx';
import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MainContainer({
  children,
  className
}: MainContainerProps): JSX.Element {
  return (
    <main
      className={cn(
        `hover-animation flex min-h-screen w-full max-w-xl flex-col 
         border-x border-light-border dark:border-dark-border`,
        className
      )}
    >
      {children}
    </main>
  );
}
