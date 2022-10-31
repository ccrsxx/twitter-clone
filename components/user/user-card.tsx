import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { ProfilePicture } from '@components/ui/profile-picture';
import { VerifiedName } from '@components/ui/verified-name';
import { UserFollowButton } from './user-follow-button';
import type { User } from '@lib/types/user';

type UserCardProps = Pick<
  User,
  'id' | 'bio' | 'name' | 'username' | 'verified' | 'photoURL'
> & {
  follow?: boolean;
};

export function UserCard({
  id,
  bio,
  name,
  follow,
  username,
  verified,
  photoURL
}: UserCardProps): JSX.Element {
  const { user } = useAuth();

  return (
    <Link href={`/user/${username}`}>
      <a
        className='hover-animation grid grid-cols-[auto,1fr] gap-3 px-4 py-3
                   hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
      >
        <ProfilePicture src={photoURL} alt={name} username={username} />
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col justify-center'>
              <VerifiedName verified={verified}>
                <p className='custom-underline -mb-1 self-start font-bold'>
                  {name}
                </p>
              </VerifiedName>
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <p>@{username}</p>
                {follow && user?.id !== id && user?.followers.includes(id) && (
                  <p className='rounded bg-main-search-background px-1 text-xs'>
                    Follows you
                  </p>
                )}
              </div>
            </div>
            {user?.id !== id && (
              <UserFollowButton
                userTargetId={id}
                userTargetUsername={username}
              />
            )}
          </div>
          {follow && bio && <p>{bio}</p>}
        </div>
      </a>
    </Link>
  );
}
