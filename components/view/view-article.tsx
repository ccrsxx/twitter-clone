import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { ImagePreview } from '@components/tweet/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { variants } from '@components/status/article';
import { StatusActions } from '@components/status/status-actions';
import { StatusStats } from '@components/status/status-stats';
import { StatusDate } from '@components/status/status-date';
import { Tweet } from '@components/tweet/tweet';
import type { User } from '@lib/types/user';
import type { Status } from '@lib/types/status';

type ViewArticleProps = Status & { user: User };

export function ViewArticle({
  id: statusId,
  text,
  images,
  userLikes,
  createdBy,
  createdAt,
  userTweets,
  userReplies,
  user: { name, username, verified, photoURL }
}: ViewArticleProps): JSX.Element {
  const { user } = useAuth();

  const statusLink = `/status/${statusId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = userId === createdBy;

  const parent = { id: statusId, username: username };

  return (
    <motion.article
      className='smooth-tab relative flex cursor-default flex-col gap-4
                 border-b border-border-color px-4 py-3 outline-none'
      {...variants}
      exit={undefined}
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
            statusId={statusId}
            isOwner={isOwner}
            userLikes={userLikes}
            userTweets={userTweets}
            userReplies={userReplies}
          />
        </div>
        <Tweet reply parent={parent} />
      </div>
    </motion.article>
  );
}
