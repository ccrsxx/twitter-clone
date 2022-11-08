import { useWindow } from '@lib/context/window-context';
import { SearchBar } from './search-bar';
import { AsideFooter } from './aside-footer';
import type { ReactNode } from 'react';

type AsideProps = {
  children: ReactNode;
};

export function Aside({ children }: AsideProps): JSX.Element | null {
  const { width } = useWindow();

  if (width < 1024) return null;

  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3 pt-1'>
      <SearchBar />
      {children}
      <AsideFooter />
    </aside>
  );
}
