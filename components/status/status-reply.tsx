import Link from 'next/link';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { ImagePreview } from '@components/tweet/image-preview';
import { StatusDate } from './status-date';
import type { Status } from '@lib/types/status';
import type { User } from '@lib/types/user';

type StatusReplyProps = {
  user: Pick<User, 'name' | 'username' | 'verified' | 'photoURL'>;
  status: Pick<Status, 'text' | 'images' | 'createdAt'>;
  statusId: string;
};

export function StatusReply({
  user: { name, username, verified, photoURL },
  status: { text, images, createdAt },
  statusId
}: StatusReplyProps): JSX.Element {
  const statusLink = `/status/${statusId}`;
  const userLink = `/user/${username}`;

  return (
    <article>
      <Link href={statusLink}>
        <a className='smooth-tab relative flex flex-col gap-4 px-4 pt-3 outline-none'>
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
              <i className='h-full w-0.5 bg-line-reply-color' />
            </div>
            <div className='min-w-0'>
              <div className='flex gap-1 text-secondary'>
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
                <StatusDate statusLink={statusLink} createdAt={createdAt} />
              </div>
              {text && (
                <p className='whitespace-pre-line break-words'>{text}</p>
              )}
              {images && (
                <ImagePreview
                  status
                  imagesPreview={images}
                  previewCount={images.length}
                />
              )}
              <p className='my-2 text-secondary'>
                Replying to{' '}
                <Link href={`/user/${username}`}>
                  <a className='custom-underline text-accent-blue'>
                    @{username}
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}
