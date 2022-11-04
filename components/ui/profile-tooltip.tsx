import Link from 'next/link';
import { FollowButton } from '@components/ui/follow-button';
import { ProfilePicture } from './profile-picture';
import { ProfileName } from './profile-name';
import { ProfileFollowing } from './profile-following';
import type { ReactNode } from 'react';
import type { User } from '@lib/types/user';

type ProfileTooltipProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'verified'
  | 'username'
  | 'photoURL'
  | 'following'
  | 'followers'
> & {
  children: ReactNode;
};

type Stats = [string, string, number];

export function ProfileTooltip({
  id,
  bio,
  name,
  verified,
  children,
  photoURL,
  username,
  following,
  followers
}: ProfileTooltipProps): JSX.Element {
  const userLink = `/user/${username}`;

  const allStats: Readonly<Stats[]> = [
    ['following', 'Following', following.length],
    ['followers', 'Followers', followers.length]
  ];

  return (
    <div className='group relative self-start text-light-primary dark:text-dark-primary'>
      {children}
      <div
        className='menu-container invisible absolute left-1/2 w-72 translate-y-2 -translate-x-1/2 rounded-2xl opacity-0 
                   [transition:visibility_0ms_ease_400ms,opacity_200ms_ease_200ms] group-hover:visible group-hover:opacity-100 
                   group-hover:delay-500'
      >
        <div className='flex flex-col gap-3 p-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <ProfilePicture
                src={photoURL}
                alt={name}
                size={64}
                username={username}
              />
              <FollowButton userTargetId={id} userTargetUsername={username} />
            </div>
            <div>
              <ProfileName username={username} verified={verified}>
                <p className='-mb-1 text-lg'>{name}</p>
              </ProfileName>
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <Link href={userLink}>
                  <a
                    className='text-light-secondary dark:text-dark-secondary'
                    tabIndex={-1}
                  >
                    @{username}
                  </a>
                </Link>
                <ProfileFollowing userTargetId={id} />
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
