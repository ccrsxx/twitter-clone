import { Toaster } from 'react-hot-toast';
import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { LoginMain } from '@components/login/login-main';
import { LoginFooter } from '@components/login/login-footer';
import type { ReactElement, ReactNode } from 'react';
import type { DefaultToastOptions } from 'react-hot-toast';

const toastOptions: DefaultToastOptions = {
  style: {
    color: 'white',
    borderRadius: '4px',
    backgroundColor: 'rgb(var(--main-accent))'
  },
  success: { duration: 4000 }
};

export default function Login(): JSX.Element {
  return (
    <div className='grid h-[100dvh] grid-rows-[1fr,auto]'>
      <SEO
        title='Twitter. It’s what’s happening'
        description='From breaking news and entertainment to sports and politics, get the full story with all the live commentary.'
      />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>
    <Toaster
      position='bottom-center'
      toastOptions={toastOptions}
      containerClassName='mb-12 xs:mb-0'
    />
    {page}
  </AuthLayout>
);
