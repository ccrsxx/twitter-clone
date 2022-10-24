import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { ProfilePicture } from '@components/ui/profile-picture';
import { VerifiedName } from '@components/ui/verified-name';
import { variants } from './more-settings';
import type { User } from '@lib/types/user';

export function SidebarProfile(): JSX.Element {
  const { user, signOut } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const { name, username, verified, photoURL } = user as User;

  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Log out of Twitter?'
          description='You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.'
          mainBtnLabel='Log out'
          mainBtnClassName='bg-follow-button-background text-follow-text-color
                            hover:bg-follow-button-background/90 
                            active:bg-follow-button-background/75'
          action={signOut}
          closeModal={closeModal}
        />
      </Modal>
      <Menu className='relative' as='section'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                `custom-button smooth-tab flex w-full
                 items-center justify-between hover:bg-primary/10
                 focus-visible:bg-primary/10 active:bg-primary/20`,
                open && 'bg-primary/10'
              )}
            >
              <div className='flex gap-3'>
                <ProfilePicture
                  src={photoURL}
                  alt={name}
                  size={40}
                  username={username}
                  disableLink
                />
                <div className='text-start leading-5'>
                  <div className='flex items-center gap-1'>
                    <VerifiedName verified={verified}>
                      <p className='text-start font-bold'>{name}</p>
                    </VerifiedName>
                  </div>
                  <p className='text-secondary'>@{username}</p>
                </div>
              </div>
              <HeroIcon iconName='EllipsisHorizontalIcon' />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='absolute left-0 right-0 -top-36 z-10 w-full rounded-md bg-black
                             outline-none [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className='flex items-center justify-between gap-2 
                               border-b border-border-color px-4 py-3'
                    as='div'
                    disabled
                  >
                    <div className='flex items-center gap-3'>
                      <ProfilePicture
                        src={photoURL}
                        alt={name}
                        username={username}
                        disableLink
                      />
                      <div>
                        <VerifiedName verified={verified}>
                          <p className='font-bold'>{name}</p>
                        </VerifiedName>
                        <p className='text-secondary'>@{username}</p>
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className='h-5 w-5 text-accent-blue'
                        iconName='CheckIcon'
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4',
                          active && 'bg-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='ArrowRightOnRectangleIcon' />
                        Log out @{username}
                      </Button>
                    )}
                  </Menu.Item>
                  <i
                    className='absolute -bottom-[10px] left-1/2 -translate-x-1/2 rotate-180
                               [filter:drop-shadow(rgb(51,54,57)1px_-1px_1px)]'
                  >
                    <CustomIcon className='h-4 w-6' iconName='TriangleIcon' />
                  </i>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
