/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageRetweet, manageLike } from '@lib/firebase/utils';
import { ViewTweetStats } from '@components/view/view-tweet-stats';
import { TweetOption } from './tweet-option';
import { TweetShare } from './tweet-share';
import type { Tweet } from '@lib/types/tweet';

type TweetStatsProps = Pick<
  Tweet,
  'userLikes' | 'userRetweets' | 'userReplies'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  tweetId: string;
  viewTweet?: boolean;
  openModal?: () => void;
};

export function TweetStats({
  reply,
  userId,
  isOwner,
  tweetId,
  userLikes,
  viewTweet,
  userRetweets,
  userReplies: totalReplies,
  openModal
}: TweetStatsProps): JSX.Element {
  const totalLikes = userLikes.length;
  const totalTweets = userRetweets.length;

  const [{ currentReplies, currentTweets, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });
  }, [totalReplies, totalLikes, totalTweets]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [totalReplies]
  );

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes]
  );

  const tweetMove = useMemo(
    () => (totalTweets > currentTweets ? -25 : 25),
    [totalTweets]
  );

  const tweetIsLiked = userLikes.includes(userId);
  const tweetIsRetweeted = userRetweets.includes(userId);

  const isStatsVisible = !!(totalReplies || totalTweets || totalLikes);

  return (
    <>
      {viewTweet && (
        <ViewTweetStats
          likeMove={likeMove}
          userLikes={userLikes}
          tweetMove={tweetMove}
          replyMove={replyMove}
          userRetweets={userRetweets}
          currentLikes={currentLikes}
          currentTweets={currentTweets}
          currentReplies={currentReplies}
          isStatsVisible={isStatsVisible}
        />
      )}
      <div
        className={cn(
          'flex text-light-secondary inner:outline-none dark:text-dark-secondary',
          viewTweet ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <TweetOption
          className='hover:text-accent-blue'
          iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20'
          tip='Reply'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewTweet={viewTweet}
          onClick={openModal}
          disabled={reply}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-green',
            tweetIsRetweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20'
          tip={tweetIsRetweeted ? 'Undo Retweet' : 'Retweet'}
          move={tweetMove}
          stats={currentTweets}
          iconName='ArrowPathRoundedSquareIcon'
          viewTweet={viewTweet}
          onClick={manageRetweet(
            tweetIsRetweeted ? 'unretweet' : 'retweet',
            userId,
            tweetId
          )}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-pink',
            tweetIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20'
          tip={tweetIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewTweet={viewTweet}
          onClick={manageLike(
            tweetIsLiked ? 'unlike' : 'like',
            userId,
            tweetId
          )}
        />
        <TweetShare userId={userId} tweetId={tweetId} viewTweet={viewTweet} />
        {isOwner && (
          <TweetOption
            className='hover:text-accent-blue'
            iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20'
            tip='Analytics'
            iconName='ChartPieIcon'
            disabled
          />
        )}
      </div>
    </>
  );
}
