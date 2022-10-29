import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
};

export function MainContainer({ children }: MainContainerProps): JSX.Element {
  return (
    <main
      className='hover-animation flex min-h-screen w-full max-w-xl flex-col border-x
                 border-light-border pb-[448px] dark:border-dark-border'
    >
      {children}
    </main>
  );
}
