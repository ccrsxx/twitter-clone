import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { HeroIcon } from '@components/ui/hero-icon';
import { UserLayout } from '@components/user/user-layout';
import type { ReactElement, ReactNode } from 'react';

export default function UserLikes(): JSX.Element {
  return (
    <section>
      <div className='flex flex-col items-center justify-center gap-2 py-5 px-3 text-secondary'>
        <i>
          <HeroIcon className='h-10 w-10' iconName='FaceFrownIcon' />
        </i>
        <p>Not yet implemented.</p>
      </div>
    </section>
  );
}

UserLikes.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>
        <UserLayout>{page}</UserLayout>
      </HomeLayout>
    </Layout>
  </ProtectedRoute>
);
