import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { query, updateDoc, where, doc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { preventBubbling } from '@lib/utils';
import { notificationsCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { useAuth } from '@lib/context/auth-context';
import { Error } from '@components/ui/error';
import { Loading } from '@components/ui/loading';
import { NotificationTypes } from '@components/common/notifications';
import type { NotificationWithUser } from '@lib/types/notification';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideNotificationsProps = {
  inNotificationsPage?: boolean;
};

export function AsideNotifications({
  inNotificationsPage
}: AsideNotificationsProps): JSX.Element {
  const { user } = useAuth();
  const navigator = useRouter();

  const { data, loading } = useInfiniteScroll(
    query(notificationsCollection),
    [where('targetUserId', '==', user?.id)],
    { includeUser: 'userId' }
  );

  return (
    <section
      className={cn(
        !inNotificationsPage &&
          'hover-animation rounded-md border border-gray-200 bg-white shadow-md dark:border-main-background dark:bg-zinc-900'
      )}
    >
      {loading ? (
        <Loading />
      ) : data ? (
        <motion.div
          className={cn(
            'inner:px-4 inner:py-3 space-y-6 py-4',
            inNotificationsPage && 'mt-0.5'
          )}
          {...variants}
        >
          {!inNotificationsPage && (
            <h2 className='text-xl font-extrabold'>Trends for you</h2>
          )}

          {data.map((notification) => {
            const NotificationProps = NotificationTypes(
              notification as NotificationWithUser
            );

            return (
              <Link
                href={NotificationProps.url}
                key={notification.id}
                legacyBehavior
              >
                <a
                  className='hover-animation accent-tab relative mx-4 flex flex-col gap-0.5 rounded-md border bg-white p-4 duration-200 hover:shadow-md dark:border-main-background dark:bg-zinc-900'
                  onClick={async (): Promise<void> => {
                    preventBubbling();
                    void navigator.push(NotificationProps.url);

                    const docRef = doc(
                      notificationsCollection,
                      notification.id
                    );

                    await updateDoc(docRef, {
                      isChecked: true
                    });
                  }}
                >
                  <div className='flex w-full items-center'>
                    <Image
                      src={NotificationProps.image_url}
                      className='mr-2  h-14 w-14 rounded-full object-cover'
                      width={56}
                      height={56}
                      objectFit='cover'
                      alt={`User image ${
                        (notification as NotificationWithUser).user.name
                      }`}
                    />
                    <div className='flex flex-col items-start'>
                      <p className='font-bold'>{NotificationProps.title}</p>
                      <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                        {NotificationProps.description}
                      </p>
                    </div>
                  </div>

                  {!notification.isChecked && (
                    <div className='absolute right-2 top-2'>
                      <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                        New
                      </p>
                    </div>
                  )}
                </a>
              </Link>
            );
          })}

          {!inNotificationsPage && (
            <Link href='/trends'>
              <span
                className='custom-button accent-tab hover-card block w-full rounded-2xl
                           rounded-t-none text-center text-main-accent'
              >
                Show more
              </span>
            </Link>
          )}
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
