import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  WithFieldValue,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useUser } from '@lib/context/user-context';
import { conversationsCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { UserHomeCover } from '@components/user/user-home-cover';
import { UserHomeAvatar } from '@components/user/user-home-avatar';
import { UserDetails } from '@components/user/user-details';
import { UserNav } from '@components/user/user-nav';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { FollowButton } from '@components/ui/follow-button';
import { variants } from '@components/user/user-header';
import { UserEditProfile } from '@components/user/user-edit-profile';
import { UserShare } from '@components/user/user-share';
import type { LayoutProps } from './common-layout';
import { Conversation } from '@lib/types/conversation';

export const UserHomeLayout = ({ children }: LayoutProps): JSX.Element => {
  const { user, isAdmin } = useAuth();
  const { user: userData, loading } = useUser();
  const router = useRouter();

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

  const handleSendMessage = async () => {
    try {
      const senders = await getDocs(
        query(conversationsCollection, where('userId', '==', userData?.id))
      );

      const emitters = await getDocs(
        query(
          conversationsCollection,
          where('targetUserId', '==', userData?.id)
        )
      );
      const unique = [...senders.docs, ...emitters.docs];
      const chat = unique
        .find(
          (doc) =>
            doc.data().userId === user?.id ||
            doc.data().targetUserId === user?.id
        )
        ?.data();

      if (chat) void router.push(`/messages/${chat.id}`);
      else {
        const doc = await addDoc(conversationsCollection, {
          userId: user?.id as string,
          targetUserId: userData?.id as string,
          createdAt: serverTimestamp(),
          updatedAt: null
        } as WithFieldValue<Omit<Conversation, 'id'>>);

        void router.push(`/messages/${doc.id}`);
      }
    } catch (err) {
      console.log('Deu rum ao enviar a msg');
    }
  };

  return (
    <>
      {userData && (
        <SEO
          title={`${`${userData.name} (@${userData.username})`} / Fofoca-me`}
        />
      )}
      <motion.section {...variants} exit={undefined}>
        {loading ? (
          <Loading className='mt-5' />
        ) : !userData ? (
          <>
            <UserHomeCover />
            <div className='flex flex-col gap-8'>
              <div className='relative flex flex-col gap-3 px-4 py-3'>
                <UserHomeAvatar />
                <p className='text-xl font-bold'>@{id}</p>
              </div>
              <div className='p-8 text-center'>
                <p className='text-3xl font-bold'>Esta conta não existe</p>
                <p className='text-light-secondary dark:text-dark-secondary'>
                  Tente procurar outro.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <UserHomeCover coverData={coverData} />
            <div className='relative flex flex-col gap-3 px-4 py-3'>
              <div className='flex justify-between'>
                <UserHomeAvatar profileData={profileData} />
                {isOwner ? (
                  <UserEditProfile />
                ) : (
                  <div className='flex gap-2 self-start'>
                    <UserShare username={userData.username} />
                    <Button
                      onClick={handleSendMessage}
                      className='dark-bg-tab group relative border border-light-line-reply p-2
                                 hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary 
                                 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
                    >
                      <HeroIcon className='h-5 w-5' iconName='EnvelopeIcon' />
                      <ToolTip tip='Message' />
                    </Button>
                    <FollowButton
                      userTargetId={userData.id}
                      userTargetUsername={userData.username}
                    />
                    {isAdmin && <UserEditProfile hide />}
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
};
