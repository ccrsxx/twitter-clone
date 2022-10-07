import { formatDate } from '@lib/format';
import { HeroIcon } from '@components/ui/hero-icon';
import { VerifiedName } from '@components/ui/verified-name';
import { ToolTip } from '@components/ui/tooltip';
import { UserFollowStats } from './user-follow-stats';
import type { IconName } from '@components/ui/hero-icon';
import type { User } from '@lib/types/user';

type UserDetailsProps = Pick<
  User,
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
  const detailIcons: [string | null, IconName][] = [
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
        <p className='text-secondary'>@{username}</p>
      </div>
      <div className='flex flex-col gap-2'>
        {bio && <p>{bio}</p>}
        <div className='flex gap-3 text-secondary'>
          {detailIcons.map(
            ([detail, icon], index) =>
              detail && (
                <div className='flex items-center gap-1' key={icon}>
                  <i>
                    <HeroIcon className='h-5 w-5' iconName={icon} />
                  </i>
                  {index === 1 ? (
                    <a
                      className='custom-underline text-accent-blue'
                      href={detail}
                    >
                      {detail}
                    </a>
                  ) : index === 2 ? (
                    <div className='custom-underline group relative cursor-pointer'>
                      {detail}
                      <ToolTip
                        className='translate-y-1'
                        tip={formatDate(createdAt, 'full')}
                      />
                    </div>
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
