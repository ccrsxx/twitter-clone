import '@styles/globals.scss';

import { GoogleTagManager } from '@next/third-parties/google';
import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { SocketContextProvider } from '@lib/context/web-socket-context';
import { AppHead } from '@components/common/app-head';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
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
    <>
      <AppHead />
      <AuthContextProvider>
        <SocketContextProvider>
          <ThemeContextProvider>
            {getLayout(<Component {...pageProps} />)}
            {process.env.NEXT_PUBLIC_GTM_CONTAINER_ID && (
              <GoogleTagManager
                gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID}
              />
            )}
          </ThemeContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </>
  );
}
