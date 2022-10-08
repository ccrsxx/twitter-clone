import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { query, where, limit } from 'firebase/firestore';
import { UserContextProvider } from '@lib/context/user-context';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { UserHeader } from '@components/user/user-header';
import { UserCover } from '@components/user/user-cover';
import { UserProfile } from '@components/user/user-profile';
import { UserDetails } from '@components/user/user-details';
import { UserNav } from '@components/user/user-nav';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { UserFollowButton } from './user-follow-button';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

type UserLayoutProps = {
  children: ReactNode;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function UserLayout({ children }: UserLayoutProps): JSX.Element {
  const { user } = useAuth();

  const {
    query: { id },
    back
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

  const { id: userId, following } = user ?? {};

  const userIsFollowed = !!following?.includes(userData?.id ?? '');
  const isOwner = userData?.id === userId;

  return (
    <MainContainer>
      {!loading && (
        <SEO
          title={`${
            userData
              ? `${userData.name} (@${userData.username})`
              : 'User not found'
          } / Twitter`}
        />
      )}
      <MainHeader useActionButton action={back}>
        <UserHeader loading={loading} userData={userData} />
      </MainHeader>
      <motion.section {...variants} exit={undefined}>
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
                {isOwner ? (
                  <Button
                    className='self-start border border-border-color-secondary px-4 py-1
                               font-bold hover:bg-follow-button-background/10'
                  >
                    Edit profile
                  </Button>
                ) : (
                  <div className='flex gap-2 self-start'>
                    <Button
                      className='group relative border border-border-color-secondary p-2
                                 hover:bg-primary/10 active:bg-primary/20 disabled:brightness-100'
                      disabled
                    >
                      <HeroIcon
                        className='h-5 w-5'
                        iconName='EllipsisHorizontalIcon'
                      />
                      <ToolTip tip='More' />
                    </Button>
                    <Button
                      className='group relative border border-border-color-secondary p-2
                                 hover:bg-primary/10 active:bg-primary/20 disabled:brightness-100'
                      disabled
                    >
                      <HeroIcon className='h-5 w-5' iconName='EnvelopeIcon' />
                      <ToolTip tip='Message' />
                    </Button>
                    <UserFollowButton
                      userId={userId as string}
                      userTargetId={userData.id}
                      userIsFollowed={userIsFollowed}
                      userTargetUsername={userData.username}
                    />
                  </div>
                )}
              </div>
              <UserDetails {...userData} />
            </div>
          </>
        )}
      </motion.section>
      {userData && (
        <>
          <UserNav />
          <UserContextProvider
            value={{
              id: userData.id,
              name: userData.name,
              username: userData.username
            }}
          >
            {children}
          </UserContextProvider>
        </>
      )}
    </MainContainer>
  );
}
