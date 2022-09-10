import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { Sidebar } from '@components/sidebar/sidebar';
import { Aside } from '@components/aside/aside';
import { Placeholder } from './placeholder';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: LayoutProps): JSX.Element {
  const { user, pending } = useRequireAuth();

  if (!user || pending) return <Placeholder />;

  return <>{children}</>;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex justify-center gap-4'>
      <Sidebar />
      {children}
    </div>
  );
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside />
    </>
  );
}
