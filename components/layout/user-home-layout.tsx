import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useUser } from '@lib/context/user-context';
import { SEO } from '@components/common/seo';
import { UserCover } from '@components/user/user-cover';
import { UserProfile } from '@components/user/user-profile';
import { UserDetails } from '@components/user/user-details';
import { UserNav } from '@components/user/user-nav';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from '@components/user/user-header';
import { UserFollowButton } from '@components/user/user-follow-button';
import { UserEditProfile } from '@components/user/user-edit-profile';
import type { LayoutProps } from './common-layout';

export function UserHomeLayout({ children }: LayoutProps): JSX.Element {
  const { user } = useAuth();
  const { user: userData, loading } = useUser();

  const {
    query: { id }
  } = useRouter();

  const coverData = userData?.coverPhotoURL
    ? { src: userData.coverPhotoURL, alt: userData.name }
    : null;

  const profileData = userData
    ? { src: userData.photoURL, alt: userData.name }
    : null;

  const { id: userId } = user ?? {};

  const isOwner = userData?.id === userId;

  return (
    <>
      {userData && (
        <SEO
          title={`${`${userData.name} (@${userData.username})`} / Twitter`}
        />
      )}
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
                  <UserEditProfile />
                ) : (
                  <div className='flex gap-2 self-start'>
                    <Button
                      className='group relative border border-border-color-secondary p-2
                                 hover:bg-primary/10 active:bg-primary/20 disabled:brightness-100'
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
                      userTargetId={userData.id}
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
          {children}
        </>
      )}
    </>
  );
}
