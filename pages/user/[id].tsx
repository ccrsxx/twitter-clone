import { useRouter } from 'next/router';
import { limit, query, where } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { ProtectedRoute, HomeLayout, Layout } from '@components/common/layout';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { UserHeader } from '@components/user/user-header';
import { UserCover } from '@components/user/user-cover';
import { UserProfile } from '@components/user/user-profile';
import { UserDetails } from '@components/user/user-details';
import { UserNav } from '@components/user/user-nav';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import type { ReactElement, ReactNode } from 'react';

export default function UserId(): JSX.Element {
  const { user } = useAuth();

  const {
    back,
    query: { id }
  } = useRouter();

  const { data, loading } = useCollection(
    query(usersCollection, where('username', '==', id), limit(1)),
    { allowNull: true }
  );

  const userData = data ? data[0] : null;

  const coverData = userData?.coverPhotoURL
    ? { src: userData.coverPhotoURL, alt: userData.name }
    : null;

  const profileData = userData
    ? { src: userData.photoURL, alt: userData.name }
    : null;

  const isOwner = userData?.id === user?.id;

  return (
    <MainContainer>
      <MainHeader useActionButton action={back}>
        <UserHeader loading={loading} userData={userData} />
      </MainHeader>
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !userData ? (
          <>
            <UserCover />
            <div className='flex flex-col gap-8'>
              <div className='relative flex flex-col gap-3 px-4 py-3'>
                <UserProfile />
                <p className='text-xl font-bold'>@{id}</p>
              </div>
              <div className='p-8 text-center'>
                <p className='text-3xl font-bold'>This account doesn’t exist</p>
                <p className='text-secondary'>Try searching for another.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <UserCover coverData={coverData} />
            <div className='relative flex flex-col gap-3 px-4 py-3'>
              <div className='flex justify-between'>
                <UserProfile profileData={profileData} />
                {isOwner && (
                  <Button
                    className='self-start border border-border-color-secondary px-4 py-1
                               font-bold hover:bg-follow-button-background/10'
                  >
                    Edit profile
                  </Button>
                )}
              </div>
              <UserDetails {...userData} />
            </div>
          </>
        )}
      </section>
      {userData && <UserNav />}
    </MainContainer>
  );
}

UserId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
