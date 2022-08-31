import Link from 'next/link';
import cn from 'clsx';
import { HeroIcon } from './hero-icon';
import type { IconName } from './hero-icon';

type NavLinkProps = {
  href: string;
  iconName: IconName;
  linkName: string;
  pathname: string;
};

export function NavLink({
  href,
  iconName,
  linkName,
  pathname
}: NavLinkProps): JSX.Element {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <a className='group flex outline-none'>
        <div
          className={cn(
            'custom-button flex items-center gap-4 self-start pr-5 text-xl',
            'transition group-hover:bg-hover-color group-focus-visible:ring-2',
            'group-focus-visible:ring-white group-focus-visible:duration-200',
            isActive && 'font-bold'
          )}
        >
          <HeroIcon
            className={cn(
              'h-7 w-7',
              isActive &&
                ['Explore', 'Lists'].includes(linkName) &&
                'stroke-white'
            )}
            iconName={iconName}
            solid={isActive}
          />
          {linkName}
        </div>
      </a>
    </Link>
  );
}
