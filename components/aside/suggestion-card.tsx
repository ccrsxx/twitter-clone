import Link from 'next/link';
import { preventBubbling } from '@lib/utils';
import { ProfilePicture } from '@components/ui/profile-picture';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { User } from '@lib/types/user';

type SuggestionCardProps = Pick<
  User,
  'name' | 'username' | 'verified' | 'photoURL'
>;

export function SuggestionCard({
  name,
  username,
  verified,
  photoURL
}: SuggestionCardProps): JSX.Element {
  const userLink = `/user/${username}`;

  return (
    <Link href={userLink} key={username}>
      <a className='smooth-tab hover-animation flex items-center justify-between hover:bg-white/[0.03]'>
        <div className='flex items-center gap-3'>
          <ProfilePicture src={photoURL} alt={name} username={username} />
          <div className='leading-5'>
            <div className='flex items-center gap-1'>
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
            <p className='text-secondary'>@{username}</p>
          </div>
        </div>
        <Button
          className='bg-follow-button-background px-4 py-1 font-bold text-follow-text-color
                     duration-200 hover:brightness-90 active:brightness-75'
          onClick={preventBubbling()}
        >
          Follow
        </Button>
      </a>
    </Link>
  );
}
