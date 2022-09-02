import { Sidebar } from '@components/sidebar/sidebar';
import { Aside } from '@components/aside/aside';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props): JSX.Element {
  return (
    <>
      {children}
      <Aside />
    </>
  );
}

export function Layout({ children }: Props): JSX.Element {
  return (
    <div className='flex justify-center gap-4'>
      <Sidebar />
      {children}
    </div>
  );
}
