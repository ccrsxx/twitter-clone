import Link from 'next/link';
import { useWindow } from '@lib/context/window-context';
import { FollowButton } from '@components/ui/follow-button';
import { NextImage } from '@components/ui/next-image';
import { UserAvatar } from './user-avatar';
import { UserName } from './user-name';
import { UserFollowing } from './user-following';
import { UserUsername } from './user-username';
import type { ReactNode } from 'react';
import type { User } from '@lib/types/user';

type UserTooltipProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'verified'
  | 'username'
  | 'photoURL'
  | 'following'
  | 'followers'
  | 'coverPhotoURL'
> & {
  modal?: boolean;
  children: ReactNode;
};

type Stats = [string, string, number];

export function UserTooltip({
  id,
  bio,
  name,
  modal,
  verified,
  children,
  photoURL,
  username,
  following,
  followers,
  coverPhotoURL
}: UserTooltipProps): JSX.Element {
  const { isMobile } = useWindow();

  if (isMobile || modal) return <>{children}</>;

  const userLink = `/user/${username}`;

  const allStats: Readonly<Stats[]> = [
    ['following', 'Following', following.length],
    ['followers', 'Followers', followers.length]
  ];

  return (
    <div className='group relative self-start text-light-primary dark:text-dark-primary'>
      {children}
      <div
        className='menu-container invisible absolute left-1/2 w-72 translate-y-2 -translate-x-1/2 rounded-2xl 
                   opacity-0 [transition:visibility_0ms_ease_400ms,opacity_200ms_ease_200ms] group-hover:visible 
                   group-hover:opacity-100 group-hover:delay-500'
      >
        <div className='flex flex-col gap-3 p-4'>
          <div className='flex flex-col gap-2'>
            <div className='-mx-4 -mt-4'>
              {coverPhotoURL ? (
                <Link href={userLink}>
                  <a className='blur-picture'>
                    <NextImage
                      useSkeleton
                      className='relative h-24'
                      imgClassName='rounded-t-2xl'
                      src={coverPhotoURL}
                      alt={name}
                      layout='fill'
                    />
                  </a>
                </Link>
              ) : (
                <div className='h-16 rounded-t-2xl bg-light-line-reply dark:bg-dark-line-reply' />
              )}
            </div>
            <div className='flex justify-between'>
              <div className='mb-10'>
                <UserAvatar
                  className='absolute -translate-y-1/2 bg-main-background p-1 
                             hover:brightness-100 [&>figure>span]:[transition:200ms]
                             [&:hover>figure>span]:brightness-75'
                  src={photoURL}
                  alt={name}
                  size={64}
                  username={username}
                />
              </div>
              <FollowButton userTargetId={id} userTargetUsername={username} />
            </div>
            <div>
              <UserName
                className='-mb-1 text-lg'
                name={name}
                username={username}
                verified={verified}
              />
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <UserUsername username={username} />
                <UserFollowing userTargetId={id} />
              </div>
            </div>
          </div>
          {bio && <p>{bio}</p>}
          <div className='text-secondary flex gap-4'>
            {allStats.map(([id, label, stat]) => (
              <Link href={`${userLink}/${id}`} key={id}>
                <a
                  className='hover-animation flex h-4 items-center gap-1 border-b border-b-transparent 
                             outline-none hover:border-b-light-primary focus-visible:border-b-light-primary
                             dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary'
                >
                  <p className='font-bold'>{stat}</p>
                  <p className='text-light-secondary dark:text-dark-secondary'>
                    {label}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
