import Link from 'next/link';
import { ProfilePicture } from '@components/ui/profile-picture';
import { ProfileTooltip } from '@components/ui/profile-tooltip';
import { ProfileName } from '@components/ui/profile-name';
import { ProfileFollowing } from '@components/ui/profile-following';
import { FollowButton } from '@components/ui/follow-button';
import type { User } from '@lib/types/user';

type UserCardProps = User & {
  follow?: boolean;
};

export function UserCard(user: UserCardProps): JSX.Element {
  const { id, bio, name, follow, username, verified, photoURL } = user;

  return (
    <Link href={`/user/${username}`}>
      <a
        className='hover-animation grid grid-cols-[auto,1fr] gap-3 px-4 py-3
                   hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
      >
        <ProfileTooltip {...user}>
          <ProfilePicture src={photoURL} alt={name} username={username} />
        </ProfileTooltip>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col justify-center'>
              <ProfileTooltip {...user}>
                <ProfileName username={username} verified={verified}>
                  <p className='-mb-1 self-start'>{name}</p>
                </ProfileName>
              </ProfileTooltip>
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <ProfileTooltip {...user}>
                  <p className='text-light-secondary dark:text-dark-secondary'>
                    @{username}
                  </p>
                </ProfileTooltip>
                {follow && <ProfileFollowing userTargetId={id} />}
              </div>
            </div>
            <FollowButton userTargetId={id} userTargetUsername={username} />
          </div>
          {follow && bio && <p>{bio}</p>}
        </div>
      </a>
    </Link>
  );
}
