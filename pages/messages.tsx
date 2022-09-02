import { Layout, MainLayout } from '@components/common/layout';
import Home from './home';
import type { ReactElement, ReactNode } from 'react';

export default function NotDoneYet(): JSX.Element {
  return <Home />;
}

NotDoneYet.getLayout = (page: ReactElement): ReactNode => (
  <Layout>
    <MainLayout>{page}</MainLayout>
  </Layout>
);
