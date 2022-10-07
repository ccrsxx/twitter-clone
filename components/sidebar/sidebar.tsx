import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { Input } from '@components/input/input';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { SidebarLink } from './sidebar-link';
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
  }
];

export function Sidebar(): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const { asPath } = useRouter();

  return (
    <header className='-mr-4 flex w-full max-w-xs justify-end'>
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full mt-8'
        open={open}
        closeModal={closeModal}
      >
        <Input modal closeModal={closeModal} />
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
                pathname={asPath}
                {...linkData}
                key={linkData.href}
              />
            ))}
            <SidebarLink
              href={`/user/${user?.username as string}`}
              pathname={asPath}
              linkName='Profile'
              iconName='UserIcon'
            />
            <MoreSettings />
          </nav>
          <Button
            className='w-11/12 bg-accent-blue font-bold text-white outline-none
                       hover:bg-accent-blue/90 active:bg-accent-blue/75'
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
