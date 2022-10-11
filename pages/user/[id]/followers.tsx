import {
  MainLayout,
  HomeLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { UserLayout } from '@components/layout/user-layout';
import { UserFollowLayout } from '@components/layout/user-follow-layout';
import { UserFollow } from '@components/user/user-follow';
import type { ReactElement, ReactNode } from 'react';

export default function UserFollowers(): JSX.Element {
  return <UserFollow type='followers' />;
}

UserFollowers.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>
        <UserLayout>
          <UserFollowLayout>{page}</UserFollowLayout>
        </UserLayout>
      </HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
