import Link from 'next/link';
import cn from 'clsx';
import { HeroIcon } from '../ui/hero-icon';
import type { IconName } from '../ui/hero-icon';

type SidebarLinkProps = {
  href: string;
  iconName: IconName;
  linkName: string;
  pathname: string;
};

export function SidebarLink({
  href,
  iconName,
  linkName,
  pathname
}: SidebarLinkProps): JSX.Element {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <a className='group flex py-1 outline-none'>
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
