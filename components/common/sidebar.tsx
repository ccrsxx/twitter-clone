import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
import { useRouter } from 'next/router';
import NextImage from '@components/ui/next-image';
import { NavLink } from '@components/ui/nav-link';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import type { IconName } from '@components/ui/hero-icon';

const rawLinks: [string, IconName][] = [
  ['home', 'HomeIcon'],
  ['explore', 'HashtagIcon'],
  ['notifications', 'BellIcon'],
  ['messages', 'EnvelopeIcon'],
  ['bookmarks', 'BookmarkIcon'],
  ['lists', 'Bars3BottomLeftIcon'],
  ['profile', 'UserIcon']
];

const navLinks = rawLinks.map(([link, iconName]) => ({
  href: `/${link}`,
  iconName,
  linkName: link[0].toUpperCase() + link.slice(1)
}));

export function Sidebar(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <header className='flex flex-1 justify-end'>
      <div className='fixed top-0 flex h-full w-72 flex-col justify-between overflow-auto px-4 py-3'>
        <div className='flex flex-col gap-4'>
          <h1 className='flex'>
            <Link href='/home'>
              <a className='custom-button smooth-tab transition focus-visible:ring-accent-secondary-blue'>
                <FaTwitter className='h-7 w-7' />
              </a>
            </Link>
          </h1>
          <nav className='flex flex-col gap-2'>
            {navLinks.map(({ ...linkData }) => (
              <NavLink pathname={pathname} {...linkData} key={linkData.href} />
            ))}
            <div className='group flex'>
              <Button className='flex gap-4 pr-5 text-xl group-hover:bg-hover-color'>
                <HeroIcon
                  className='h-7 w-7'
                  iconName='EllipsisHorizontalCircleIcon'
                />{' '}
                More
              </Button>
            </div>
          </nav>
          <Button
            className='w-[90%] bg-accent-blue outline-none transition hover:bg-accent-blue
                       hover:brightness-90'
          >
            Tweet
          </Button>
        </div>
        <Button className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <NextImage
              imgClassName='rounded-full'
              width={40}
              height={40}
              src='/placeholder.jpg'
              alt='ccrsxx'
              useSkeleton
            />
            <div className='leading-5'>
              <p className='text-start font-bold'>Ami</p>
              <p className='text-secondary'>@ccrsxx</p>
            </div>
          </div>
          <HeroIcon iconName='EllipsisHorizontalIcon' />
        </Button>
      </div>
    </header>
  );
}
