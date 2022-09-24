/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageTweet, manageLike } from '@lib/firebase/utils';
import { ViewPostStats } from './view-post-stats';
import { PostOption } from './post-option';
import { PostShare } from './post-share';
import type { Post } from '@lib/types/post';

type PostStatsProps = Pick<Post, 'userLikes' | 'userTweets' | 'userReplies'> & {
  userId: string;
  postId: string;
  isOwner: boolean;
  viewPost?: boolean;
};

export function PostStats({
  userId,
  postId,
  isOwner,
  viewPost,
  userLikes,
  userTweets,
  userReplies
}: PostStatsProps): JSX.Element {
  const totalReplies = userReplies.length;
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
  }, [userReplies, totalLikes, totalTweets]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [userReplies]
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

  return (
    <>
      {viewPost && (
        <ViewPostStats
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
          viewPost ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <PostOption
          className='hover:text-accent-blue-secondary inner:transition'
          iconClassName='group-hover:bg-accent-blue-secondary/10 group-active:bg-accent-blue-secondary/20'
          tip='Reply'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewPost={viewPost}
        />
        <PostOption
          className={cn(
            'hover:text-accent-green inner:transition',
            postIsTweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20'
          tip={postIsTweeted ? 'Undo Retweet' : 'Retweet'}
          move={tweetMove}
          stats={currentTweets}
          iconName='ArrowPathRoundedSquareIcon'
          viewPost={viewPost}
          onClick={manageTweet(
            postIsTweeted ? 'untweet' : 'tweet',
            userId,
            postId
          )}
        />
        <PostOption
          className={cn(
            'hover:text-accent-pink inner:transition',
            postIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20'
          tip={postIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewPost={viewPost}
          onClick={manageLike(postIsLiked ? 'unlike' : 'like', userId, postId)}
        />
        <PostShare userId={userId} postId={postId} viewPost={viewPost} />
        {isOwner && (
          <PostOption
            className='hover:text-accent-blue-secondary inner:transition'
            iconClassName='group-hover:bg-accent-blue-secondary/10 group-active:bg-accent-blue-secondary/20'
            tip='Analytics'
            iconName='ChartPieIcon'
          />
        )}
      </div>
    </>
  );
}
