import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { removePost } from '@lib/firebase/utils';
import { useModal } from '@lib/hooks/useModal';
import { convertDate } from '@lib/date';
import { ImagePreview } from '@components/tweet/image-preview';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { Tooltips } from '@components/ui/tooltips';
import { Options } from './options';
import type { Variants } from 'framer-motion';
import type { Post } from '@lib/types/post';
import type { User } from '@lib/types/user';

type ArticleProps = Post & { user: User };

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Article({
  id,
  text,
  images,
  createdBy,
  createdAt,
  user: { name, username, verified, photoURL }
}: ArticleProps): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const handleClose = async (): Promise<void> => {
    await removePost(id);
    closeModal();
  };

  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = isAdmin || user?.uid === createdBy;

  return (
    <motion.article
      className='relative grid grid-cols-[auto,1fr] gap-3 
                 border-b border-border-color px-4 py-3'
      {...variants}
      layout
    >
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title='Delete Tweet?'
          description='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.'
          mainBtnLabel='Delete'
          action={handleClose}
          closeModal={closeModal}
        />
      </Modal>
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
          <div className='flex gap-1 text-secondary'>
            <div className='flex gap-1'>
              <div className='flex items-center gap-1 text-primary'>
                <Link href={userLink}>
                  <a className='custom-underline'>
                    <p className='font-bold'>{name}</p>
                  </a>
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
                <a>
                  <p>@{username}</p>
                </a>
              </Link>
            </div>
            <i>·</i>
            <div className='group relative'>
              <p className='custom-underline'>{convertDate(createdAt, true)}</p>
              <Tooltips
                className='translate-y-1'
                tips={convertDate(createdAt)}
              />
            </div>
            <div className='absolute right-2 top-2'>
              <Button
                className='hover-animation group relative p-2 hover:bg-accent-blue-secondary/10
                       active:bg-accent-blue-secondary/20'
                onClick={isOwner ? openModal : undefined}
              >
                <HeroIcon
                  className='h-5 w-5 text-secondary group-hover:text-accent-blue-secondary'
                  iconName='EllipsisHorizontalIcon'
                />
                <Tooltips tips='More' />
              </Button>
            </div>
          </div>
          {text && <p className='whitespace-pre-line break-words'>{text}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          {images && (
            <ImagePreview
              post
              imagesPreview={images}
              previewCount={images.length}
            />
          )}
          <Options />
        </div>
      </div>
    </motion.article>
  );
}
