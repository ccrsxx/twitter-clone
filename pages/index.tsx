import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { Main } from '@components/login/main';
import { Controls } from '@components/login/controls';
import { Footer } from '@components/login/footer';
import { Placeholder } from '@components/common/placeholder';

export default function Login(): JSX.Element {
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (user) void replace('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || user) return <Placeholder />;

  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <Main>
        <Controls />
      </Main>
      <Footer />
    </div>
  );
}
