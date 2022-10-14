import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
};

export function MainContainer({ children }: MainContainerProps): JSX.Element {
  return (
    <main
      className='flex min-h-screen w-full max-w-xl flex-col
                 border-x border-border-color pb-[448px]'
    >
      {children}
    </main>
  );
}
