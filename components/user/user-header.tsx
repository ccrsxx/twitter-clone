import { AnimatePresence, motion } from 'framer-motion';
import { VerifiedName } from '@components/ui/verified-name';
import type { User } from '@lib/types/user';
import type { Variants } from 'framer-motion';

type UserHeaderProps = {
  user: User | null;
  userId?: string;
  follow?: boolean;
  loading: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function UserHeader({
  user,
  userId,
  follow,
  loading
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
      ) : !user ? (
        <motion.h2 className='text-xl font-bold' {...variants} key='not-found'>
          {follow ? `@${userId as string}` : 'Profile'}
        </motion.h2>
      ) : (
        <motion.div className='-mb-1' {...variants} key='found'>
          <VerifiedName
            className='-mt-1'
            iconClassName='w-6 h-6'
            verified={user.verified}
          >
            <h2 className='text-xl font-bold'>{user.name}</h2>
          </VerifiedName>
          <p className='text-xs text-secondary'>
            {follow
              ? `@${user.username}`
              : user.totalTweets
              ? `${user.totalTweets} ${`Tweet${
                  user.totalTweets > 1 ? 's' : ''
                }`}`
              : 'No Tweet'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
