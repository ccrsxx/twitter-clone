import cn from 'clsx';
import Link from 'next/link';
import { HeroIcon } from './hero-icon';
import type { ReactNode } from 'react';

type ProfileNameProps = {
  verified: boolean;
  children: ReactNode;
  username?: string;
  className?: string;
  iconClassName?: string;
};

export function ProfileName({
  verified,
  children,
  username,
  className,
  iconClassName
}: ProfileNameProps): JSX.Element {
  return (
    <Link href={username ? `/user/${username}` : '#'}>
      <a
        className={cn(
          'flex items-center gap-1 font-bold',
          username ? 'custom-underline' : 'pointer-events-none',
          className
        )}
      >
        {children}
        {verified && (
          <i>
            <HeroIcon
              className={cn(
                'fill-accent-blue dark:fill-current',
                iconClassName ?? 'h-5 w-5'
              )}
              iconName='CheckBadgeIcon'
              solid
            />
          </i>
        )}
      </a>
    </Link>
  );
}
