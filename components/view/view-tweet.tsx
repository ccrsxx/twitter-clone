import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { TweetReplyModal } from '@components/modal/tweet-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { ProfilePicture } from '@components/ui/profile-picture';
import { VerifiedName } from '@components/ui/verified-name';
import { variants } from '@components/tweet/tweet';
import { TweetActions } from '@components/tweet/tweet-actions';
import { TweetStats } from '@components/tweet/tweet-stats';
import { TweetDate } from '@components/tweet/tweet-date';
import { Input } from '@components/input/input';
import type { RefObject } from 'react';
import type { User } from '@lib/types/user';
import type { Tweet } from '@lib/types/tweet';

type ViewTweetProps = Tweet & {
  user: User;
  viewTweetRef?: RefObject<HTMLElement>;
};

export function ViewTweet(tweet: ViewTweetProps): JSX.Element {
  const {
    id: tweetId,
    text,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    userRetweets,
    userReplies,
    viewTweetRef,
    user: { name, username, verified, photoURL }
  } = tweet;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const tweetLink = `/tweet/${tweetId}`;

  const userId = user?.id as string;
  const userLink = `/user/${username}`;

  const isOwner = userId === createdBy;

  const reply = !!parent;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  return (
    <motion.article
      className={cn(
        `smooth-tab h- relative flex cursor-default flex-col 
         gap-3 border-b border-light-border px-4 py-3 outline-none dark:border-dark-border`,
        reply && 'pt-0 [scroll-margin-top:3.25rem]'
      )}
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
      ref={viewTweetRef}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <TweetReplyModal tweet={tweet} closeModal={closeModal} />
      </Modal>
      <div className='flex flex-col gap-2'>
        {reply && (
          <div className='flex w-12 items-center justify-center'>
            <i className='hover-animation h-2 w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
          </div>
        )}
        <div className='grid grid-cols-[auto,1fr] gap-3'>
          <ProfilePicture src={photoURL} alt={name} username={username} />
          <div className='flex min-w-0 flex-col gap-1'>
            <div className='flex flex-col'>
              <div className='-mb-1 flex items-center gap-1'>
                <VerifiedName verified={verified}>
                  <Link href={userLink}>
                    <a className='custom-underline font-bold'>{name}</a>
                  </Link>
                </VerifiedName>
              </div>
              <Link href={userLink}>
                <a
                  className='self-start text-light-secondary outline-none dark:text-dark-secondary'
                  tabIndex={-1}
                >
                  @{username}
                </a>
              </Link>
            </div>
            <TweetActions
              isOwner={isOwner}
              tweetId={tweetId}
              parentId={parentId}
              username={username}
              hasImages={!!images}
              createdBy={createdBy}
            />
          </div>
        </div>
      </div>
      {reply && (
        <p className='text-light-secondary dark:text-dark-secondary'>
          Replying to{' '}
          <Link href={`/user/${parentUsername}`}>
            <a className='custom-underline text-main-accent'>
              @{parentUsername}
            </a>
          </Link>
        </p>
      )}
      <div>
        {text && (
          <p className='whitespace-pre-line break-words text-2xl'>{text}</p>
        )}
        {images && (
          <ImagePreview
            tweet
            imagesPreview={images}
            previewCount={images.length}
          />
        )}
        <div
          className='inner:hover-animation inner:border-b inner:border-light-border
                     dark:inner:border-dark-border'
        >
          <TweetDate viewTweet tweetLink={tweetLink} createdAt={createdAt} />
          <TweetStats
            viewTweet
            reply={reply}
            userId={userId}
            isOwner={isOwner}
            tweetId={tweetId}
            userLikes={userLikes}
            userRetweets={userRetweets}
            userReplies={userReplies}
            openModal={!parent ? openModal : undefined}
          />
        </div>
        <Input
          reply
          parent={{ id: tweetId, username: username }}
          disabled={!!parent}
        />
      </div>
    </motion.article>
  );
}
