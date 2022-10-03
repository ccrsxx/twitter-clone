import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ReplyTweetModal } from '@components/modal/reply-tweet-modal';
import { ImagePreview } from '@components/tweet/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { variants } from '@components/status/status';
import { StatusActions } from '@components/status/status-actions';
import { StatusStats } from '@components/status/status-stats';
import { StatusDate } from '@components/status/status-date';
import { Tweet } from '@components/tweet/tweet';
import type { RefObject } from 'react';
import type { User } from '@lib/types/user';
import type { Status } from '@lib/types/status';

type ViewStatusProps = Status & {
  user: User;
  reply?: boolean;
  viewStatusRef?: RefObject<HTMLElement>;
};

export function ViewStatus(status: ViewStatusProps): JSX.Element {
  const {
    id: statusId,
    text,
    reply,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    userTweets,
    userReplies,
    viewStatusRef,
    user: { name, username, verified, photoURL }
  } = status;

  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const statusLink = `/status/${statusId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isOwner = userId === createdBy;

  return (
    <motion.article
      className={cn(
        `smooth-tab h- relative flex cursor-default flex-col 
         gap-3 border-b border-border-color px-4 py-3 outline-none`,
        reply && 'pt-0 [scroll-margin-top:3.25rem]'
      )}
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
      ref={viewStatusRef}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full mt-8'
        open={open}
        closeModal={closeModal}
      >
        <ReplyTweetModal status={status} closeModal={closeModal} />
      </Modal>
      <div className='flex flex-col gap-2'>
        {reply && (
          <div className='flex w-12 items-center justify-center'>
            <i className='h-2 w-0.5 bg-line-reply-color' />
          </div>
        )}
        <div className='grid grid-cols-[auto,1fr] gap-3'>
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
          <div className='flex min-w-0 flex-col gap-1'>
            <div className='flex flex-col'>
              <div className='-mb-1 flex items-center gap-1'>
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
                <a
                  className='self-start text-secondary outline-none'
                  tabIndex={-1}
                >
                  @{username}
                </a>
              </Link>
            </div>
            <StatusActions
              isOwner={isOwner}
              statusId={statusId}
              username={username}
            />
          </div>
        </div>
      </div>
      {reply && (
        <p className='text-secondary'>
          Replying to{' '}
          <Link href={`/user/${username}`}>
            <a className='custom-underline text-accent-blue'>@{username}</a>
          </Link>
        </p>
      )}
      <div>
        {text && (
          <p className='whitespace-pre-line break-words text-2xl'>{text}</p>
        )}
        {images && (
          <ImagePreview
            status
            imagesPreview={images}
            previewCount={images.length}
          />
        )}
        <div className='inner:border-b inner:border-border-color'>
          <StatusDate
            viewStatus
            statusLink={statusLink}
            createdAt={createdAt}
          />
          <StatusStats
            viewStatus
            reply={reply}
            userId={userId}
            isOwner={isOwner}
            statusId={statusId}
            userLikes={userLikes}
            userTweets={userTweets}
            userReplies={userReplies}
            openModal={!parent ? openModal : undefined}
          />
        </div>
        <Tweet
          reply
          parent={{ id: statusId, username: username }}
          disabled={!!parent}
        />
      </div>
    </motion.article>
  );
}
