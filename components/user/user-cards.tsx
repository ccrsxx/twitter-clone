import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { NextImage } from '@components/ui/next-image';
import { Loading } from '@components/ui/loading';
import { UserFollowButton } from '@components/user/user-follow-button';
import { variants } from '@components/home/main-header';
import type { User } from '@lib/types/user';
import type { StatsType } from '@components/view/view-tweet-stats';
import type { StatsEmptyProps } from '@components/tweet/stats-empty';

type FollowType = 'following' | 'followers';

type CombinedTypes = StatsType | FollowType;

type UserCardsProps = {
  data: User[] | null;
  type: CombinedTypes;
  loading: boolean;
};

const allNoStatsData: { [key in CombinedTypes]: StatsEmptyProps } = {
  retweets: {
    title: 'Amplify Tweets you like',
    imageData: { src: '/assets/no-retweets.png', alt: 'No retweets' },
    description:
      'Share someone else’s Tweet on your timeline by Retweeting it. When you do, it’ll show up here.'
  },
  likes: {
    title: 'No Tweet Likes yet',
    imageData: { src: '/assets/no-likes.png', alt: 'No likes' },
    description: 'When you like a Tweet, it’ll show up here.'
  },
  following: {
    title: 'Be in the know',
    imageData: null,
    description:
      'Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.'
  },
  followers: {
    title: 'Looking for followers?',
    imageData: { src: '/assets/no-followers.png', alt: 'No followers' },
    description:
      'When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers.'
  }
};

export function UserCards({
  data,
  type,
  loading
}: UserCardsProps): JSX.Element {
  const { user } = useAuth();

  const noStatsData = allNoStatsData[type];

  return (
    <section className='h-full overflow-hidden rounded-2xl'>
      <div
        className={
          ['retweets', 'likes'].includes(type)
            ? 'h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]'
            : undefined
        }
      >
        {loading ? (
          <Loading className='mt-5' />
        ) : (
          <AnimatePresence mode='popLayout'>
            {data?.length ? (
              data.map(({ id, bio, name, username, photoURL }) => (
                <motion.div layout='position' key={id} {...variants}>
                  <Link href={`/user/${username}`}>
                    <a
                      className='hover-animation grid grid-cols-[auto,1fr]
                                 gap-3 px-4 py-3 hover:bg-primary/5'
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
                            <p className='text-secondary'>@{username}</p>
                          </div>
                          {user?.id !== id && (
                            <UserFollowButton
                              userTargetId={id}
                              userTargetUsername={username}
                            />
                          )}
                        </div>
                        {bio && <p>{bio}</p>}
                      </div>
                    </a>
                  </Link>
                </motion.div>
              ))
            ) : (
              <StatsEmpty {...noStatsData} />
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
