import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { Main } from '@components/login/main';
import { Controls } from '@components/login/controls';
import { Footer } from '@components/login/footer';
import { Placeholder } from '@components/common/placeholder';

// TODO: Add a Login route to handle skeleton loading

export default function Login(): JSX.Element {
  const [pending, setPending] = useState(true);

  const { userData, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => setPending(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (userData) void replace('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (pending || loading) return <Placeholder />;

  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <Main>
        <Controls />
      </Main>
      <Footer />
    </div>
  );
}
