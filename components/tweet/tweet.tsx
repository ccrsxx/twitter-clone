import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { delayScroll } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ReplyTweetModal } from '@components/modal/reply-tweet-modal';
import { ImagePreview } from '@components/input/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { TweetActions } from './tweet-actions';
import { TweetStats } from './tweet-stats';
import { TweetDate } from './tweet-date';
import type { Variants } from 'framer-motion';
import type { Tweet } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

export type TweetProps = Tweet & {
  user: User;
  reply?: boolean;
  modal?: boolean;
  parentTweet?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Tweet(tweet: TweetProps): JSX.Element {
  const {
    id: tweetId,
    text,
    reply,
    modal,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    parentTweet,
    userReplies,
    userRetweets,
    user: { name, username, verified, photoURL }
  } = tweet;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const tweetLink = `/tweet/${tweetId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isOwner = userId === createdBy;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  return (
    <motion.article
      layout='position'
      {...(!modal ? variants : {})}
      animate={{
        ...variants.animate,
        ...(parentTweet && { transition: { duration: 0.2 } })
      }}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full my-8'
        open={open}
        closeModal={closeModal}
      >
        <ReplyTweetModal tweet={tweet} closeModal={closeModal} />
      </Modal>
      <Link href={tweetLink} scroll={!reply}>
        <a
          className={cn(
            'smooth-tab relative flex flex-col gap-4 px-4 py-3 outline-none',
            parentTweet ? 'mt-0.5 pt-2.5 pb-0' : 'border-b border-border-color'
          )}
          onClick={reply ? delayScroll(100) : undefined}
        >
          <div className='grid grid-cols-[auto,1fr] gap-3'>
            <div className='flex flex-col items-center gap-2'>
              <Link href={userLink}>
                <a className='blur-picture self-start'>
                  <NextImage
                    imgClassName='rounded-full'
                    width={48}
                    height={48}
                    src={photoURL}
                    alt={name}
                  />
                </a>
              </Link>
              {parentTweet && (
                <i className='h-full w-0.5 bg-line-reply-color' />
              )}
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='text-secondary'>
                <div className='flex gap-1'>
                  <div className='flex items-center gap-1 text-primary'>
                    <Link href={userLink}>
                      <a className='custom-underline font-bold'>{name}</a>
                    </Link>
                    {verified && (
                      <i>
                        <HeroIcon
                          className='h-5 w-5'
                          iconName='CheckBadgeIcon'
                          solid
                        />
                      </i>
                    )}
                  </div>
                  <Link href={userLink}>
                    <a className='outline-none' tabIndex={-1}>
                      @{username}
                    </a>
                  </Link>
                  <TweetDate tweetLink={tweetLink} createdAt={createdAt} />
                </div>
                {!modal && (
                  <TweetActions
                    isOwner={isOwner}
                    tweetId={tweetId}
                    parentId={parentId}
                    username={username}
                    createdBy={createdBy}
                  />
                )}
              </div>
              {(reply || modal) && (
                <p className={cn('text-secondary', modal && 'order-1 my-2')}>
                  Replying to{' '}
                  <Link href={`/user/${parentUsername}`}>
                    <a className='custom-underline text-accent-blue'>
                      @{parentUsername}
                    </a>
                  </Link>
                </p>
              )}
              {text && (
                <p className='whitespace-pre-line break-words'>{text}</p>
              )}
              <div className='mt-1 flex flex-col gap-2'>
                {images && (
                  <ImagePreview
                    tweet
                    imagesPreview={images}
                    previewCount={images.length}
                  />
                )}
                {!modal && (
                  <TweetStats
                    reply={reply}
                    userId={userId}
                    isOwner={isOwner}
                    tweetId={tweetId}
                    userLikes={userLikes}
                    userReplies={userReplies}
                    userRetweets={userRetweets}
                    openModal={!parent ? openModal : undefined}
                  />
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
