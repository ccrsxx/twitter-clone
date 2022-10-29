import { useAuth } from '@lib/context/auth-context';
import { formatDate } from '@lib/date';
import { HeroIcon } from '@components/ui/hero-icon';
import { VerifiedName } from '@components/ui/verified-name';
import { ToolTip } from '@components/ui/tooltip';
import { UserFollowStats } from './user-follow-stats';
import type { IconName } from '@components/ui/hero-icon';
import type { User } from '@lib/types/user';

type UserDetailsProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'website'
  | 'username'
  | 'location'
  | 'verified'
  | 'createdAt'
  | 'following'
  | 'followers'
>;

export function UserDetails({
  id,
  bio,
  name,
  website,
  username,
  location,
  verified,
  createdAt,
  following,
  followers
}: UserDetailsProps): JSX.Element {
  const { user } = useAuth();

  const detailIcons: Readonly<[string | null, IconName][]> = [
    [location, 'MapPinIcon'],
    [website, 'LinkIcon'],
    [`Joined ${formatDate(createdAt, 'joined')}`, 'CalendarDaysIcon']
  ];

  return (
    <>
      <div>
        <VerifiedName
          className='-mb-1'
          iconClassName='w-6 h-6'
          verified={verified}
        >
          <p className='text-xl font-bold'>{name}</p>
        </VerifiedName>
        <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
          <p>@{username}</p>
          {user?.id !== id && user?.followers.includes(id) && (
            <p className='rounded bg-main-search-background px-1 text-xs'>
              Follows you
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {bio && <p className='whitespace-pre-line break-words'>{bio}</p>}
        <div className='flex gap-3 text-light-secondary dark:text-dark-secondary'>
          {detailIcons.map(
            ([detail, icon], index) =>
              detail && (
                <div className='flex items-center gap-1' key={icon}>
                  <i>
                    <HeroIcon className='h-5 w-5' iconName={icon} />
                  </i>
                  {index === 1 ? (
                    <a
                      className='custom-underline text-main-accent'
                      href={`https://${detail}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {detail}
                    </a>
                  ) : index === 2 ? (
                    <button className='custom-underline group relative'>
                      {detail}
                      <ToolTip
                        className='translate-y-1'
                        tip={formatDate(createdAt, 'full')}
                      />
                    </button>
                  ) : (
                    <p>{detail}</p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <UserFollowStats following={following} followers={followers} />
    </>
  );
}
