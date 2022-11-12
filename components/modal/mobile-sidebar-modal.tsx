import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Button } from '@components/ui/button';
import { UserAvatar } from '@components/user/user-avatar';
import { NextImage } from '@components/ui/next-image';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { MainHeader } from '@components/home/main-header';
import { MobileSidebarLink } from '@components/sidebar/mobile-sidebar-link';
import { HeroIcon } from '@components/ui/hero-icon';
import { Modal } from './modal';
import { ActionModal } from './action-modal';
import { DisplayModal } from './display-modal';
import type { NavLink } from '@components/sidebar/sidebar';
import type { User } from '@lib/types/user';

export type MobileNavLink = Omit<NavLink, 'canBeHidden'>;

const topNavLinks: Readonly<MobileNavLink[]> = [
  {
    href: '/topics',
    linkName: 'Topics',
    iconName: 'ChatBubbleBottomCenterTextIcon',
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
  },
  {
    href: '/circles',
    linkName: 'Twitter Circle',
    iconName: 'UserGroupIcon',
    disabled: true
  }
];

const bottomNavLinks: Readonly<MobileNavLink[]> = [
  {
    href: '/settings',
    linkName: 'Settings and privacy',
    iconName: 'Cog8ToothIcon',
    disabled: true
  },
  {
    href: '/help-center',
    linkName: 'Help center',
    iconName: 'QuestionMarkCircleIcon',
    disabled: true
  }
];

type Stats = [string, string, number];

type MobileSidebarModalProps = Pick<
  User,
  | 'name'
  | 'username'
  | 'verified'
  | 'photoURL'
  | 'following'
  | 'followers'
  | 'coverPhotoURL'
> & {
  closeModal: () => void;
};

export function MobileSidebarModal({
  name,
  username,
  verified,
  photoURL,
  following,
  followers,
  coverPhotoURL,
  closeModal
}: MobileSidebarModalProps): JSX.Element {
  const { signOut } = useAuth();

  const {
    open: displayOpen,
    openModal: displayOpenModal,
    closeModal: displayCloseModal
  } = useModal();

  const {
    open: logOutOpen,
    openModal: logOutOpenModal,
    closeModal: logOutCloseModal
  } = useModal();

  const allStats: Readonly<Stats[]> = [
    ['following', 'Following', following.length],
    ['followers', 'Followers', followers.length]
  ];

  const userLink = `/user/${username}`;

  return (
    <>
      <Modal
        className='items-center justify-center xs:flex'
        modalClassName='max-w-xl bg-main-background w-full p-8 rounded-2xl hover-animation'
        open={displayOpen}
        closeModal={displayCloseModal}
      >
        <DisplayModal closeModal={displayCloseModal} />
      </Modal>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={logOutOpen}
        closeModal={logOutCloseModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Log out of Twitter?'
          description='You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.'
          mainBtnLabel='Log out'
          action={signOut}
          closeModal={logOutCloseModal}
        />
      </Modal>
      <MainHeader
        useActionButton
        className='flex flex-row-reverse items-center justify-between'
        iconName='XMarkIcon'
        title='Account info'
        tip='Close'
        action={closeModal}
      />
      <section className='mt-0.5 flex flex-col gap-2 px-4'>
        <Link href={userLink}>
          <a className='blur-picture relative h-20 rounded-md'>
            {coverPhotoURL ? (
              <NextImage
                useSkeleton
                imgClassName='rounded-md'
                src={coverPhotoURL}
                alt={name}
                layout='fill'
              />
            ) : (
              <div className='h-full rounded-md bg-light-line-reply dark:bg-dark-line-reply' />
            )}
          </a>
        </Link>
        <div className='mb-8 ml-2 -mt-4'>
          <UserAvatar
            className='absolute -translate-y-1/2 bg-main-background p-1 hover:brightness-100
                       [&>figure>span]:[transition:200ms]
                       [&:hover>figure>span]:brightness-75'
            username={username}
            src={photoURL}
            alt={name}
            size={60}
          />
        </div>
        <div className='flex flex-col gap-4 rounded-xl bg-main-sidebar-background p-4'>
          <div className='flex flex-col'>
            <UserName
              name={name}
              username={username}
              verified={verified}
              className='-mb-1'
            />
            <UserUsername username={username} />
          </div>
          <div className='text-secondary flex gap-4'>
            {allStats.map(([id, label, stat]) => (
              <Link href={`${userLink}/${id}`} key={id}>
                <a
                  className='hover-animation flex h-4 items-center gap-1 border-b border-b-transparent 
                             outline-none hover:border-b-light-primary focus-visible:border-b-light-primary
                             dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary'
                >
                  <p className='font-bold'>{stat}</p>
                  <p className='text-light-secondary dark:text-dark-secondary'>
                    {label}
                  </p>
                </a>
              </Link>
            ))}
          </div>
          <i className='h-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
          <nav className='flex flex-col'>
            <MobileSidebarLink
              href={`/user/${username}`}
              iconName='UserIcon'
              linkName='Profile'
            />
            {topNavLinks.map((linkData) => (
              <MobileSidebarLink {...linkData} key={linkData.href} />
            ))}
          </nav>
          <i className='h-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
          <nav className='flex flex-col'>
            {bottomNavLinks.map((linkData) => (
              <MobileSidebarLink bottom {...linkData} key={linkData.href} />
            ))}
            <Button
              className='accent-tab accent-bg-tab flex items-center gap-2 rounded-md p-1.5 font-bold transition
                         hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] 
                         dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white'
              onClick={displayOpenModal}
            >
              <HeroIcon className='h-5 w-5' iconName='PaintBrushIcon' />
              Display
            </Button>
            <Button
              className='accent-tab accent-bg-tab flex items-center gap-2 rounded-md p-1.5 font-bold transition
                         hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] 
                         dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white'
              onClick={logOutOpenModal}
            >
              <HeroIcon
                className='h-5 w-5'
                iconName='ArrowRightOnRectangleIcon'
              />
              Log out
            </Button>
          </nav>
        </div>
      </section>
    </>
  );
}
