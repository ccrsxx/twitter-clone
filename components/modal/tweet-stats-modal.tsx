import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { preventBubbling } from '@lib/utils';
import { NextImage } from '@components/ui/next-image';
import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { StatsType } from '@components/view/view-status-stats';

type TweetStatsModalProps = {
  data: User[] | null;
  loading: boolean;
  statsType: StatsType | null;
  handleClose: () => void;
};

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function TweetStatsModal({
  data,
  loading,
  statsType,
  handleClose
}: TweetStatsModalProps): JSX.Element {
  const { user } = useAuth();

  const currentUsername = user?.username;

  return (
    <>
      <MainHeader
        useActionButton
        tip='Close'
        iconName='XMarkIcon'
        className='flex items-center gap-6 rounded-t-2xl'
        title={`${statsType as string} by`}
        action={handleClose}
      />
      <section className='h-[524px] overflow-y-auto'>
        {loading ? (
          <Loading className='flex h-full items-center justify-center' />
        ) : (
          <AnimatePresence mode='popLayout'>
            {data?.length ? (
              data.map(({ uid, bio, name, username, photoURL }) => (
                <motion.div layout='position' key={uid} {...variants}>
                  <Link href={`user/${username}`}>
                    <a
                      className='hover-animation grid grid-cols-[auto,1fr] gap-3
                                 px-4 py-3 hover:bg-primary/5'
                    >
                      <Link href={`/user/${username}`}>
                        <a className='blur-picture'>
                          <NextImage
                            imgClassName='rounded-full'
                            width={48}
                            height={48}
                            src={photoURL}
                            alt={name}
                          />
                        </a>
                      </Link>
                      <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-between'>
                          <div className='flex flex-col'>
                            <p className='custom-underline -mb-1 self-start'>
                              {name}
                            </p>
                            <p className='text-secondary'>{username}</p>
                          </div>
                          {currentUsername !== username && (
                            <Button
                              className='bg-primary px-4 py-1 font-bold text-follow-text-color 
                                         duration-200 hover:brightness-90 active:brightness-75'
                              onClick={preventBubbling()}
                            >
                              Follow
                            </Button>
                          )}
                        </div>
                        {bio && <p>{bio}</p>}
                      </div>
                    </a>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className='flex justify-center p-8'>
                <div className='w-full max-w-sm'>
                  <div className='flex flex-col items-center gap-6'>
                    <NextImage
                      width={336}
                      height={168}
                      src='/assets/parrot.png'
                      alt='Parrot'
                    />
                    <div className='flex flex-col gap-2 text-center'>
                      <p className='text-3xl font-extrabold'>
                        Amplify Tweets you like
                      </p>
                      <p className='text-secondary'>
                        Share someone else’s Tweet on your timeline by
                        Retweeting it. When you do, it’ll show up here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        )}
      </section>
    </>
  );
}
