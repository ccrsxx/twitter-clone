import { useRouter } from 'next/router';
import Link from 'next/link';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { Tweet } from '@components/tweet/tweet';
import { SidebarLink } from '@components/sidebar/sidebar-link';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { MoreSettings } from './more-settings';
import { SidebarProfile } from './sidebar-profile';
import type { IconName } from '@components/ui/hero-icon';

type NavLinks = { href: string; linkName: string; iconName: IconName }[];

const navLinks: NavLinks = [
  {
    href: '/home',
    linkName: 'Home',
    iconName: 'HomeIcon'
  },
  {
    href: '/explore',
    linkName: 'Explore',
    iconName: 'HashtagIcon'
  },
  {
    href: '/notifications',
    linkName: 'Notifications',
    iconName: 'BellIcon'
  },
  {
    href: '/messages',
    linkName: 'Messages',
    iconName: 'EnvelopeIcon'
  },
  {
    href: '/bookmarks',
    linkName: 'Bookmarks',
    iconName: 'BookmarkIcon'
  },
  {
    href: '/lists',
    linkName: 'Lists',
    iconName: 'Bars3BottomLeftIcon'
  },
  {
    href: '/profile',
    linkName: 'Profile',
    iconName: 'UserIcon'
  }
];

export function Sidebar(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const { pathname } = useRouter();

  return (
    <header className='-mr-4 flex w-full max-w-xs justify-end'>
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full mt-8'
        open={open}
        closeModal={closeModal}
      >
        <Tweet modal closeModal={closeModal} />
      </Modal>
      <div className='fixed top-0 flex h-full w-72 flex-col justify-between overflow-auto px-4 py-3 pt-2'>
        <div className='flex flex-col gap-2'>
          <h1 className='flex'>
            <Link href='/home'>
              <a
                className='custom-button smooth-tab relative text-icon-background transition
                           hover:bg-primary/10 focus-visible:ring-accent-blue-focus'
              >
                <CustomIcon className='h-7 w-7' iconName='TwitterIcon' />
              </a>
            </Link>
          </h1>
          <nav>
            {navLinks.map(({ ...linkData }) => (
              <SidebarLink
                pathname={pathname}
                {...linkData}
                key={linkData.href}
              />
            ))}
            <MoreSettings />
          </nav>
          <Button
            className='w-11/12 bg-accent-blue-secondary font-bold text-white outline-none
                       hover:bg-accent-blue-secondary/90 active:bg-accent-blue-secondary/75'
            onClick={openModal}
          >
            Tweet
          </Button>
        </div>
        <SidebarProfile />
      </div>
    </header>
  );
}
