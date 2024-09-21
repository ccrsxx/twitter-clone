import Link from 'next/link';
import {
  CiHome,
  CiHashtag,
  CiMail,
  CiBellOn,
  CiBookmark,
  CiUser,
  CiSearch
} from 'react-icons/ci';
import { useState, useEffect } from 'react';
import { query, where } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { notificationsCollection } from '@lib/firebase/collections';
import { Modal } from '@components/modal/modal';
import { Input } from '@components/input/input';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { SidebarLink } from './sidebar-link';
import { MoreSettings } from './more-settings';
import { SidebarProfile } from './sidebar-profile';
import type { ReactNode } from 'react';

import type * as SolidIcons from '@heroicons/react/24/solid';
import type * as OutlineIcons from '@heroicons/react/24/outline';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

export type NavLink = {
  href: string;
  linkName: string;
  isNotification?: boolean;
  disabled?: boolean;
  canBeHidden?: boolean;
  icon?: ReactNode;
  iconName: IconName;
  count?: number;
};

export type NewNavLinks = NavLink;

export function Sidebar(): JSX.Element {
  const { user } = useAuth();
  const { isMobile } = useWindow();
  const path = usePathname();

  const { open, openModal, closeModal } = useModal();

  const username = user?.username as string;

  const [navLinksWithCount, setNavLinksWithCount] = useState<NewNavLinks[]>([
    {
      href: '/home',
      linkName: 'Home',
      count: 0,
      iconName: 'HomeIcon',
      icon: <CiHome size={34} />
    },
    {
      href: '/trends',
      linkName: 'Trends',
      disabled: false,
      canBeHidden: true,
      count: 0,
      iconName: 'HashtagIcon',
      icon: <CiHashtag size={34} />
    },
    {
      href: '/notifications',
      linkName: 'Notifications',
      disabled: false,
      isNotification: true,
      count: 0,
      iconName: 'BellIcon',
      icon: <CiBellOn size={34} />
    },
    {
      href: '/messages',
      linkName: 'Messages',
      disabled: false,
      count: 0,
      iconName: 'EnvelopeIcon',
      icon: <CiMail size={34} />
    },
    {
      href: '/bookmarks',
      linkName: 'Bookmarks',
      canBeHidden: true,
      count: 0,
      iconName: 'BookmarkIcon',
      icon: <CiBookmark size={34} />
    },
    {
      href: '/explore',
      linkName: 'Search',
      disabled: false,
      canBeHidden: true,
      iconName: 'Bars3BottomLeftIcon',
      icon: <CiSearch size={34} />
    }
  ]);

  const { data: notifications } = useCollection(
    query(
      notificationsCollection,
      where('targetUserId', '==', user?.id),
      where('isChecked', '==', false)
    )
  );

  useEffect(() => {
    if (notifications)
      setNavLinksWithCount((prevItems) =>
        prevItems.map((link: NewNavLinks) =>
          link.linkName === 'Notifications'
            ? { ...link, count: notifications.length }
            : link
        )
      );
  }, [notifications]);

  return (
    <header
      id='sidebar'
      className='flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24
                 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end'
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <Input modal closeModal={closeModal} />
      </Modal>
      <div
        className='fixed bottom-0 z-10 flex w-full flex-col justify-between border-t border-light-border 
                   bg-main-background py-0 dark:border-dark-border xs:top-0 xs:h-full xs:w-auto xs:border-0 
                   xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72'
      >
        <section className='flex flex-col justify-center gap-2 xs:items-center xl:items-stretch'>
          <h1 className='hidden xs:flex'>
            <Link href='/home' className='custom-button main-tab text-accent-blue transition hover:bg-light-primary/10  focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 dark:text-twitter-icon dark:hover:bg-dark-primary/10'>
              <CustomIcon className='fill-current h-7 w-7' iconName='TwitterIcon' />
            </Link>
          </h1>
          <nav className='flex items-center justify-around xs:flex-col xs:justify-center xl:block'>
            {navLinksWithCount.map(({ ...linkData }) => (
              <SidebarLink {...linkData} key={linkData.href} />
            ))}
            <SidebarLink
              href={`/${username}`}
              username={username}
              linkName='Profile'
              icon={<CiUser size={34} />}
              iconName='UserIcon'
            />
            {!isMobile && <MoreSettings />}
          </nav>
          {!path.includes('messages/') && (
            <Button
              className='accent-tab absolute right-4 -translate-y-[72px] bg-main-accent text-lg font-bold text-white
                       outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:translate-y-0
                       xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12'
              onClick={openModal}
            >
              <CustomIcon
                className='block h-6 w-6 xl:hidden'
                iconName='FeatherIcon'
              />
              <p className='hidden xl:block'>Tweet</p>
            </Button>
          )}
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
