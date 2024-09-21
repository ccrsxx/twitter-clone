import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import Image from 'next/image';
import { conversationsCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { useAuth } from '@lib/context/auth-context';
import { Error } from '@components/ui/error';
import { Loading } from '@components/ui/loading';
import type { ConversationWithUser } from '@lib/types/conversation';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export function MessageTable(): JSX.Element {
  const { user } = useAuth();

  const { data: senders, loading: sLoading } = useInfiniteScroll(
    query(conversationsCollection),
    [where('userId', '==', user?.id)],
    { includeUser: 'targetUserId' }
  );

  const { data: emitters, loading: eLoading } = useInfiniteScroll(
    query(conversationsCollection),
    [where('targetUserId', '==', user?.id)],
    { includeUser: 'userId' }
  );

  const data = [...(senders ?? []), ...(emitters ?? [])];

  return (
    <section>
      {sLoading || eLoading ? (
        <Loading />
      ) : data ? (
        <motion.div className={cn('space-y-6 mx-4 py-4')} {...variants}>
          {data.map((conversation) => (
            <Link
              href={`/messages/${conversation.id}`}
              key={conversation.id}
              legacyBehavior
            >
              <div className='cursor-pointer flex w-full items-center hover-animation accent-tab relative gap-0.5 rounded-md border bg-white p-4 duration-200 hover:shadow-md dark:border-main-background dark:bg-zinc-900'>
                <Image
                  src={(conversation as ConversationWithUser).user.photoURL}
                  className='mr-2 h-14 w-14 rounded-full object-cover'
                  width={56}
                  height={56}
                  objectFit='cover'
                  alt={`User picture ${
                    (conversation as ConversationWithUser).user.name
                  }`}
                />
                <div className='flex flex-col items-start'>
                  <p className='font-bold'>
                    {(conversation as ConversationWithUser).user.name}
                  </p>
                  <a className='text-sm text-light-secondary dark:text-dark-secondary'>
                    View message
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
