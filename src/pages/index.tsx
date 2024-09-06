import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { LoginMain } from '@components/login/login-main';
import { LoginFooter } from '@components/login/login-footer';
import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Fofoca-me - A nossa rede social!'
        description='Desde os nossos memes aos debates políticos, tudo você encontra aqui.'
      />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
