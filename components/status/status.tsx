import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ReplyTweetModal } from '@components/modal/reply-tweet-modal';
import { ImagePreview } from '@components/tweet/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { StatusActions } from './status-actions';
import { StatusStats } from './status-stats';
import { StatusDate } from './status-date';
import type { Variants } from 'framer-motion';
import type { Status } from '@lib/types/status';
import type { User } from '@lib/types/user';

type StatusProps = Status & {
  user: User;
  reply?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Status({
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
  user: { name, username, verified, photoURL }
}: StatusProps): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const statusLink = `/status/${statusId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = userId === createdBy;

  const { id: parentId, username: parentUsername } = parent ?? {};

  return (
    <motion.article layout='position' {...variants}>
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
      <Link href={statusLink}>
        <a
          className='smooth-tab relative flex flex-col gap-4 border-b
                     border-border-color px-4 py-3 outline-none'
        >
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
              <div>
                <div>
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
                      <StatusDate
                        statusLink={statusLink}
                        createdAt={createdAt}
                      />
                    </div>
                    {reply && (
                      <p>
                        Replying to{' '}
                        <Link href={`/user/${parentUsername as string}`}>
                          <a className='custom-underline text-accent-blue'>
                            @{parentUsername as string}
                          </a>
                        </Link>
                      </p>
                    )}
                  </div>
                  <StatusActions
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                    parentId={parentId}
                    statusId={statusId}
                    username={username}
                  />
                </div>
                {text && (
                  <p className='whitespace-pre-line break-words'>{text}</p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                {images && (
                  <ImagePreview
                    status
                    imagesPreview={images}
                    previewCount={images.length}
                  />
                )}
                <StatusStats
                  userId={userId}
                  isOwner={isOwner}
                  statusId={statusId}
                  userLikes={userLikes}
                  userTweets={userTweets}
                  userReplies={userReplies}
                  openModal={!parent ? openModal : undefined}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
