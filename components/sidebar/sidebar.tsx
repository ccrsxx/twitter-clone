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

export type NavLink = {
  href: string;
  linkName: string;
  iconName: IconName;
  disabled?: boolean;
};

const navLinks: Readonly<NavLink[]> = [
  {
    href: '/home',
    linkName: 'Home',
    iconName: 'HomeIcon'
  },
  {
    href: '/explore',
    linkName: 'Explore',
    iconName: 'HashtagIcon',
    disabled: true
  },
  {
    href: '/notifications',
    linkName: 'Notifications',
    iconName: 'BellIcon',
    disabled: true
  },
  {
    href: '/messages',
    linkName: 'Messages',
    iconName: 'EnvelopeIcon',
    disabled: true
  },
  {
    href: '/bookmarks',
    linkName: 'Bookmarks',
    iconName: 'BookmarkIcon'
  },
  {
    href: '/lists',
    linkName: 'Lists',
    iconName: 'Bars3BottomLeftIcon',
    disabled: true
  }
];

export function Sidebar(): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const { asPath } = useRouter();

  const username = user?.username as string;

  return (
    <header className='-mr-4 flex w-full max-w-xs justify-end'>
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <Input modal closeModal={closeModal} />
      </Modal>
      <div className='fixed top-0 flex h-full w-72 flex-col justify-between overflow-auto px-4 py-3 pt-2'>
        <section className='flex flex-col gap-2'>
          <h1 className='flex'>
            <Link href='/home'>
              <a
                className='custom-button smooth-tab focus-visible:ring-main-accent-focus relative text-accent-blue
                           transition hover:bg-light-primary/10 dark:text-twitter-icon dark:hover:bg-dark-primary/10'
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
              href={`/user/${username}`}
              username={username}
              pathname={asPath}
              linkName='Profile'
              iconName='UserIcon'
            />
            <MoreSettings />
          </nav>
          <Button
            className='w-11/12 bg-main-accent text-lg font-bold text-white
                       outline-none hover:bg-main-accent/90 active:bg-main-accent/75'
            onClick={openModal}
          >
            Tweet
          </Button>
        </section>
        <SidebarProfile />
      </div>
    </header>
  );
}
