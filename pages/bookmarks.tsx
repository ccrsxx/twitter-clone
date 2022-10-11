import {
  ProtectedLayout,
  MainLayout,
  HomeLayout
} from '@components/layout/common-layout';
import Home from './home';
import type { ReactElement, ReactNode } from 'react';

export default function NotDoneYet(): JSX.Element {
  return <Home />;
}

NotDoneYet.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
