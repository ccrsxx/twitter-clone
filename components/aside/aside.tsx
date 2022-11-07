import { SearchBar } from './search-bar';
import { AsideFooter } from './aside-footer';
import type { ReactNode } from 'react';

type AsideProps = {
  children: ReactNode;
};

export function Aside({ children }: AsideProps): JSX.Element {
  return (
    <aside className='hidden w-96 flex-col gap-4 px-4 py-3 pt-1 lg:flex'>
      <SearchBar />
      {children}
      <AsideFooter />
    </aside>
  );
}
