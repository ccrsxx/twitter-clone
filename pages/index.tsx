import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { sleep } from '@lib/utils';
import { SEO } from '@components/common/seo';
import { Main } from '@components/login/main';
import { Controls } from '@components/login/controls';
import { Footer } from '@components/login/footer';
import { Placeholder } from '@components/common/placeholder';

export default function Login(): JSX.Element {
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

  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Twitter - It’s what’s happening'
        description='From breaking news and entertainment to sports and politics, get the full story with all the live commentary.'
      />
      <Main>
        <Controls />
      </Main>
      <Footer />
    </div>
  );
}
