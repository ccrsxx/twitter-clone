import '@styles/globals.scss';

import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJson } from '@lib/fetch';
import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { AppHead } from '@components/common/app-head';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DefaultToastOptions } from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/ban-types
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const toastOptions: DefaultToastOptions = {
  style: {
    backgroundColor: 'rgb(var(--main-accent))',
    borderRadius: '4px',
    color: 'white'
  },
  success: { duration: 4000 }
};

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <AppHead />
        <SWRConfig value={{ fetcher: fetchJson }}>
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
        <Toaster position='bottom-center' toastOptions={toastOptions} />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
