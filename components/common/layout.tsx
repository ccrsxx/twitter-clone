import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { sleep } from '@lib/utils';
import { Sidebar } from '@components/sidebar/sidebar';
import { Aside } from '@components/aside/aside';
import { Placeholder } from './placeholder';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export function AuthRoute({ children }: LayoutProps): JSX.Element {
  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      if (user) {
        await sleep(500);
        void replace('/home');
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

    void checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || pending) return <Placeholder />;

  return <>{children}</>;
}

export function ProtectedRoute({ children }: LayoutProps): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

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
