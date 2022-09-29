import Link from 'next/link';
import { motion } from 'framer-motion';
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
import type { User } from '@lib/types/user';
import type { Status } from '@lib/types/status';

type ViewStatusProps = Status & { user: User };

export function ViewStatus({
  id: statusId,
  text,
  images,
  parent,
  userLikes,
  createdBy,
  createdAt,
  userTweets,
  userReplies,
  user: { name, username, verified, photoURL }
}: ViewStatusProps): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const statusLink = `/status/${statusId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = userId === createdBy;

  return (
    <motion.article
      className='smooth-tab relative flex cursor-default flex-col gap-4
                 border-b border-border-color px-4 py-3 outline-none'
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full mt-8'
        open={open}
        closeModal={closeModal}
      >
        <ReplyTweetModal
          user={{ name, username, verified, photoURL }}
          status={{ text, images, createdAt }}
          statusId={statusId}
          closeModal={closeModal}
        />
      </Modal>
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
              <a className='text-secondary outline-none' tabIndex={-1}>
                @{username}
              </a>
            </Link>
          </div>
          <StatusActions
            isAdmin={isAdmin}
            isOwner={isOwner}
            statusId={statusId}
            username={username}
          />
        </div>
      </div>
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
