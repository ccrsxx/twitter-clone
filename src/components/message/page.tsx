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
        <motion.div className={cn('inner:px-4 inner:py-3')} {...variants}>
          {data.map((conversation) => (
            <Link
              href={`/messages/${conversation.id}`}
              key={conversation.id}
              legacyBehavior
            >
              <a
                className='hover-animation accent-tab hover-card relative 
                         flex  flex-col gap-0.5 px-4 py-2'
              >
                <div className='flex w-full items-center'>
                  <Image
                    src={(conversation as ConversationWithUser).user.photoURL}
                    className='mr-2  h-14 w-14 rounded-full object-cover'
                    width={56}
                    height={56}
                    objectFit='cover'
                    alt={`Imagem do usuário ${
                      (conversation as ConversationWithUser).user.name
                    }`}
                  />
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>
                      {(conversation as ConversationWithUser).user.name}
                    </p>
                    <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                      Visualize as mensagens
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
