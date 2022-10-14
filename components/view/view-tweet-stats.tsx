import { useState } from 'react';
import cn from 'clsx';
import { query, where } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { Modal } from '@components/modal/modal';
import { TweetStatsModal } from '@components/modal/tweet-stats-modal';
import { NumberStats } from '@components/tweet/number-stats';
import { UserCards } from '@components/user/user-cards';
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

export type StatsType = 'retweets' | 'likes';

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
          : statsType === 'retweets'
          ? normalizedTweets
          : normalizedLikes
      )
    ),
    { disabled: !statsType }
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
    ['Retweet', 'retweets', tweetMove, currentTweets],
    ['Like', 'likes', likeMove, currentLikes]
  ];

  return (
    <>
      <Modal
        modalClassName='relative bg-black rounded-2xl max-w-xl w-full 
                        h-[672px] overflow-hidden rounded-2xl'
        open={open}
        closeModal={handleClose}
      >
        <TweetStatsModal statsType={statsType} handleClose={handleClose}>
          <UserCards
            type={statsType as StatsType}
            data={data}
            loading={loading}
          />
        </TweetStatsModal>
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
