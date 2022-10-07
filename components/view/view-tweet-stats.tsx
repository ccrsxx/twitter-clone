import { useState } from 'react';
import cn from 'clsx';
import { query, where } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { Modal } from '@components/modal/modal';
import { TweetStatsModal } from '@components/modal/tweet-stats-modal';
import { NumberStats } from '@components/tweet/number-stats';
import type { Tweet } from '@lib/types/tweet';

type viewTweetStats = Pick<Tweet, 'userRetweets' | 'userLikes'> & {
  likeMove: number;
  tweetMove: number;
  replyMove: number;
  currentLikes: number;
  currentTweets: number;
  currentReplies: number;
  isStatsVisible: boolean;
};

export type StatsType = 'Retweeted' | 'Liked';

export function ViewTweetStats({
  likeMove,
  userLikes,
  tweetMove,
  replyMove,
  userRetweets,
  currentLikes,
  currentTweets,
  currentReplies,
  isStatsVisible
}: viewTweetStats): JSX.Element {
  const [statsType, setStatsType] = useState<StatsType | null>(null);

  const [normalizedTweets, normalizedLikes] = [userRetweets, userLikes].map(
    (arr) => (arr.length ? arr : [null])
  );

  const { open, openModal, closeModal } = useModal();

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(
        'id',
        'in',
        !statsType
          ? [null]
          : statsType === 'Retweeted'
          ? normalizedTweets
          : normalizedLikes
      )
    ),
    {
      disabled: !statsType
    }
  );

  const handleOpen = (type: StatsType) => (): void => {
    setStatsType(type);
    openModal();
  };

  const handleClose = (): void => {
    setStatsType(null);
    closeModal();
  };

  const allStats: [string, StatsType | null, number, number][] = [
    ['Reply', null, replyMove, currentReplies],
    ['Retweet', 'Retweeted', tweetMove, currentTweets],
    ['Like', 'Liked', likeMove, currentLikes]
  ];

  return (
    <>
      <Modal
        modalClassName='bg-black rounded-2xl max-w-xl w-full h-[576px]'
        open={open}
        closeModal={handleClose}
      >
        <TweetStatsModal
          data={data}
          loading={loading}
          statsType={statsType}
          handleClose={handleClose}
        />
      </Modal>
      {isStatsVisible && (
        <div
          className='flex gap-4 px-1 py-4 text-secondary
                     [&>button>div]:font-bold [&>button>div]:text-white'
        >
          {allStats.map(
            ([title, type, move, stats], index) =>
              !!stats && (
                <button
                  className={cn(
                    `mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b border-b-transparent 
                     outline-none transition duration-200 hover:border-b-primary 
                     focus-visible:border-b-primary`,
                    index === 0 && 'cursor-not-allowed'
                  )}
                  key={title}
                  onClick={type ? handleOpen(type) : undefined}
                >
                  <NumberStats move={move} stats={stats} />
                  <p>{`${
                    stats === 1
                      ? title
                      : stats > 1 && index === 0
                      ? `${title.slice(0, -1)}ies`
                      : `${title}s`
                  }`}</p>
                </button>
              )
          )}
        </div>
      )}
    </>
  );
}
