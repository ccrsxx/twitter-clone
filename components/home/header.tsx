import type { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <div
      className='sticky top-0 z-10 flex items-center justify-between
                 bg-black/60 px-4 py-2 backdrop-blur-md'
    >
      {children}
    </div>
  );
}
