/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { manageTweet, manageLike } from '@lib/firebase/utils';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import type { MotionProps } from 'framer-motion';
import type { Post } from '@lib/types/post';

type OptionsProps = Pick<Post, 'userLikes' | 'userTweets' | 'userReplies'> & {
  userId: string;
  postId: string;
  isOwner: boolean;
};

function getAnimationMove(movePixels: number): MotionProps {
  return {
    initial: {
      opacity: 0,
      y: -movePixels
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: movePixels
    },
    transition: {
      type: 'tween',
      duration: 0.15
    }
  };
}

export function Options({
  userId,
  postId,
  isOwner,
  userLikes,
  userTweets,
  userReplies
}: OptionsProps): JSX.Element {
  const totalLikes = userLikes.length;
  const totalTweets = userTweets.length;

  const [{ currentReplies, currentTweets, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: userReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: userReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });
  }, [userReplies, totalLikes, totalTweets]);

  const replyMove = useMemo(
    () => (userReplies > currentReplies ? -25 : 25),
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
    <div className='flex max-w-md justify-between text-secondary inner:outline-none'>
      <button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-blue-secondary inner:transition
                   inner:duration-200'
      >
        <i
          className='relative rounded-full p-2 not-italic
                     group-hover:bg-accent-blue-secondary/10
                     group-focus-visible:ring-2
                     group-focus-visible:ring-white
                     group-active:bg-accent-blue-secondary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ChatBubbleOvalLeftIcon' />
          <ToolTip tip='Reply' />
        </i>
        <div className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            {!!currentReplies && (
              <motion.p
                className='text-sm'
                {...getAnimationMove(replyMove)}
                key={currentReplies}
              >
                {currentReplies}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
      <motion.button
        className={cn(
          `transition-non group flex items-center gap-1 p-0
           hover:text-accent-green inner:transition
           inner:duration-200`,
          postIsTweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
        )}
        layout='position'
        onClick={manageTweet(
          postIsTweeted ? 'untweet' : 'tweet',
          userId,
          postId
        )}
      >
        <i
          className='relative rounded-full p-2 not-italic
                     group-hover:bg-accent-green/10
                     group-focus-visible:ring-2
                     group-focus-visible:ring-white
                     group-active:bg-accent-green/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ArrowPathRoundedSquareIcon' />
          <ToolTip tip={postIsTweeted ? 'Undo Retweet' : 'Retweet'} />
        </i>
        <div className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            {!!currentTweets && (
              <motion.p
                className='text-sm'
                {...getAnimationMove(tweetMove)}
                key={currentTweets}
              >
                {currentTweets}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
      <motion.button
        className={cn(
          `transition-non group flex items-center gap-1 p-0
           hover:text-accent-pink inner:transition
           inner:duration-200`,
          postIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
        )}
        layout='position'
        onClick={manageLike(postIsLiked ? 'unlike' : 'like', userId, postId)}
      >
        <i
          className='relative rounded-full p-2 not-italic
                     group-hover:bg-accent-pink/10
                     group-focus-visible:ring-2
                     group-focus-visible:ring-white
                     group-active:bg-accent-pink/20'
        >
          <HeroIcon className='h-5 w-5' iconName='HeartIcon' />
          <ToolTip tip={postIsLiked ? 'Unlike' : 'Like'} />
        </i>
        <div className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            {!!currentLikes && (
              <motion.p
                className='text-sm'
                {...getAnimationMove(likeMove)}
                key={currentLikes}
              >
                {currentLikes}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
      <motion.button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-blue-secondary inner:transition
                   inner:duration-200'
        layout='position'
      >
        <i
          className='relative rounded-full p-2 not-italic
                     group-hover:bg-accent-blue-secondary/10
                     group-focus-visible:ring-2
                     group-focus-visible:ring-white
                     group-active:bg-accent-blue-secondary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ArrowUpTrayIcon' />
          <ToolTip tip='Share' />
        </i>
      </motion.button>
      {isOwner && (
        <button
          className='group flex items-center gap-1 p-0 transition-none
                     hover:text-accent-blue-secondary inner:transition
                     inner:duration-200'
        >
          <i
            className='relative rounded-full p-2 not-italic
                       group-hover:bg-accent-blue-secondary/10
                       group-focus-visible:ring-2
                       group-focus-visible:ring-white
                       group-active:bg-accent-blue-secondary/20'
          >
            <HeroIcon className='h-5 w-5' iconName='RocketLaunchIcon' />
            <ToolTip tip='Analytics' />
          </i>
        </button>
      )}
    </div>
  );
}
