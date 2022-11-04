import Link from 'next/link';
import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { HeroIcon } from '../ui/hero-icon';
import type { NavLink } from './sidebar';

type SidebarLinkProps = NavLink & {
  pathname: string;
  username?: string;
};

export function SidebarLink({
  href,
  username,
  iconName,
  linkName,
  pathname,
  disabled
}: SidebarLinkProps): JSX.Element {
  const isActive = username ? pathname.includes(username) : pathname === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          'group flex py-1 outline-none',
          disabled && 'cursor-not-allowed'
        )}
        onClick={disabled ? preventBubbling() : undefined}
      >
        <div
          className={cn(
            `custom-button flex gap-4 self-start pr-5 text-xl transition duration-200 group-hover:bg-light-primary/10
             group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10
             dark:group-focus-visible:ring-white`,
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
