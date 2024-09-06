import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { preventBubbling } from '@lib/utils';
import { notificationsCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { Error } from '@components/ui/error';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { Loading } from '@components/ui/loading';
import type { MotionProps } from 'framer-motion';
import { NotificationTypes } from '@components/common/notifications';
import { NotificationWithUser } from '@lib/types/notification';
import Image from 'next/image';
import { useAuth } from '@lib/context/auth-context';

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

  const { data, loading } = useInfiniteScroll(
    query(notificationsCollection),
    [where('targetUserId', '==', user?.id)],
    { includeUser: 'targetUserId' }
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
            'inner:px-4 inner:py-3',
            inNotificationsPage && 'mt-0.5'
          )}
          {...variants}
        >
          {!inNotificationsPage && (
            <h2 className='text-xl font-extrabold'>Tendências para você</h2>
          )}

          {data.map((notification) => {
            const NotificationProps = NotificationTypes(
              notification as NotificationWithUser
            );

            return (
              <Link href={NotificationProps.url} key={notification.id}>
                <span
                  className='hover-animation accent-tab hover-card relative 
                         flex  flex-col gap-0.5 px-4 py-2'
                  onClick={preventBubbling()}
                >
                  <div className='flex w-full items-center'>
                    <Image
                      src={NotificationProps.image_url}
                      className='mr-2  h-14 w-14 rounded-full object-cover'
                      width={56}
                      height={56}
                      objectFit='cover'
                      alt={`Imagem do usuário ${
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

                  <div className='absolute right-2 top-2'>
                    <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                      Nova
                    </p>
                  </div>
                </span>
              </Link>
            );
          })}

          {!inNotificationsPage && (
            <Link href='/trends'>
              <span
                className='custom-button accent-tab hover-card block w-full rounded-2xl
                           rounded-t-none text-center text-main-accent'
              >
                Mostrar mais
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
