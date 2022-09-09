import '@styles/globals.scss';

import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJson } from '@lib/fetchJson';
import { AuthContextProvider } from '@lib/context/auth-context';
import { AppHead } from '@components/common/app-head';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/ban-types
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <AuthContextProvider>
      <AppHead />
      <SWRConfig value={{ fetcher: fetchJson }}>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
      <Toaster position='bottom-center' />
    </AuthContextProvider>
  );
}
