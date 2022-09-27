/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageTweet, manageLike } from '@lib/firebase/utils';
import { ViewStatusStats } from '@components/view/view-status-stats';
import { StatusOption } from './status-option';
import { StatusShare } from './status-share';
import type { Status } from '@lib/types/status';

type StatusStatsProps = Pick<
  Status,
  'userLikes' | 'userTweets' | 'userReplies'
> & {
  userId: string;
  isOwner: boolean;
  statusId: string;
  viewStatus?: boolean;
};

export function StatusStats({
  userId,
  isOwner,
  statusId,
  userLikes,
  viewStatus,
  userTweets,
  userReplies: totalReplies
}: StatusStatsProps): JSX.Element {
  const totalLikes = userLikes.length;
  const totalTweets = userTweets.length;

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

  const postIsLiked = userLikes.includes(userId);
  const postIsTweeted = userTweets.includes(userId);

  const isStatsVisible = !!(
    viewStatus &&
    (totalReplies || totalTweets || totalLikes)
  );

  return (
    <>
      {isStatsVisible && (
        <ViewStatusStats
          statusId={statusId}
          likeMove={likeMove}
          tweetMove={tweetMove}
          replyMove={replyMove}
          currentLikes={currentLikes}
          currentTweets={currentTweets}
          currentReplies={currentReplies}
        />
      )}
      <div
        className={cn(
          'flex text-secondary inner:outline-none',
          viewStatus ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <StatusOption
          className='hover:text-accent-blue'
          iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20'
          tip='Reply'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewStatus={viewStatus}
        />
        <StatusOption
          className={cn(
            'hover:text-accent-green',
            postIsTweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20'
          tip={postIsTweeted ? 'Undo Retweet' : 'Retweet'}
          move={tweetMove}
          stats={currentTweets}
          iconName='ArrowPathRoundedSquareIcon'
          viewStatus={viewStatus}
          onClick={manageTweet(
            postIsTweeted ? 'untweet' : 'tweet',
            userId,
            statusId
          )}
        />
        <StatusOption
          className={cn(
            'hover:text-accent-pink',
            postIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20'
          tip={postIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewStatus={viewStatus}
          onClick={manageLike(
            postIsLiked ? 'unlike' : 'like',
            userId,
            statusId
          )}
        />
        <StatusShare
          userId={userId}
          statusId={statusId}
          viewStatus={viewStatus}
        />
        {isOwner && (
          <StatusOption
            className='hover:text-accent-blue'
            iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20'
            tip='Analytics'
            iconName='ChartPieIcon'
          />
        )}
      </div>
    </>
  );
}
