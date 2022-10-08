import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { UserFollowLayout } from '@components/user/user-follow-layout';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ReactElement, ReactNode } from 'react';

export default function UserFollowing(): JSX.Element {
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

UserFollowing.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>
        <UserFollowLayout>{page}</UserFollowLayout>
      </HomeLayout>
    </Layout>
  </ProtectedRoute>
);
