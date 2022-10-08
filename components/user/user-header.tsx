import { AnimatePresence, motion } from 'framer-motion';
import { VerifiedName } from '@components/ui/verified-name';
import { variants } from './user-layout';
import type { User } from '@lib/types/user';

type UserHeaderProps = {
  userId?: string;
  follow?: boolean;
  loading: boolean;
  userData: User | null;
};

export function UserHeader({
  userId,
  follow,
  loading,
  userData
}: UserHeaderProps): JSX.Element {
  return (
    <AnimatePresence mode='popLayout'>
      {loading ? (
        <motion.div
          className='-mb-1 inner:animate-pulse inner:rounded-lg inner:bg-white'
          {...variants}
          key='loading'
        >
          <div className='mb-1 -mt-1 h-5 w-24' />
          <div className='h-4 w-12' />
        </motion.div>
      ) : !userData ? (
        <motion.h2 className='text-xl font-bold' {...variants} key='not-found'>
          {follow ? `@${userId as string}` : 'Profile'}
        </motion.h2>
      ) : (
        <motion.div className='-mb-1' {...variants} key='found'>
          <VerifiedName
            className='-mt-1'
            iconClassName='w-6 h-6'
            verified={userData.verified}
          >
            <h2 className='text-xl font-bold'>{userData.name}</h2>
          </VerifiedName>
          <p className='text-xs text-secondary'>
            {follow
              ? `@${userData.username}`
              : userData.totalTweets
              ? `${userData.totalTweets} ${`Tweet${
                  userData.totalTweets > 1 ? 's' : ''
                }`}`
              : 'No Tweet'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
