import Link from 'next/link';
import { UserAvatar } from '@components/user/user-avatar';
import { FollowButton } from '@components/ui/follow-button';
import { UserTooltip } from './user-tooltip';
import { UserName } from './user-name';
import { UserFollowing } from './user-following';
import { UserUsername } from './user-username';
import type { User } from '@lib/types/user';

type UserCardProps = User & {
  follow?: boolean;
};

export function UserCard(user: UserCardProps): JSX.Element {
  const { id, bio, name, follow, username, verified, photoURL } = user;

  return (
    <Link href={`/user/${username}`}>
      <a
        className='accent-tab hover-animation grid grid-cols-[auto,1fr] gap-3 px-4 py-3
                   hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
      >
        <UserTooltip {...user}>
          <UserAvatar src={photoURL} alt={name} username={username} />
        </UserTooltip>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col justify-center'>
              <UserTooltip {...user}>
                <UserName
                  className='-mb-1 self-start'
                  name={name}
                  username={username}
                  verified={verified}
                />
              </UserTooltip>
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <UserTooltip {...user}>
                  <UserUsername username={username} />
                </UserTooltip>
                {follow && <UserFollowing userTargetId={id} />}
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
