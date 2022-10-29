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
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Log out of Twitter?'
          description='You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.'
          mainBtnLabel='Log out'
          mainBtnClassName='bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 
                            dark:text-light-primary dark:bg-light-border dark:hover:bg-light-border/90 
                            dark:active:bg-light-border/75'
          action={signOut}
          closeModal={closeModal}
        />
      </Modal>
      <Menu className='relative' as='section'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                `custom-button smooth-tab flex w-full items-center justify-between hover:bg-light-primary/10
                 focus-visible:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10
                 dark:focus-visible:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
                open && 'bg-light-primary/10 dark:bg-dark-primary/10'
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
                  <p className='text-light-secondary dark:text-dark-secondary'>
                    @{username}
                  </p>
                </div>
              </div>
              <HeroIcon iconName='EllipsisHorizontalIcon' />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute left-0 right-0 -top-36 w-full font-medium'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className='flex items-center justify-between gap-2 border-b 
                               border-light-border px-4 py-3 dark:border-dark-border'
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
                        <p className='text-light-secondary dark:text-dark-secondary'>
                          @{username}
                        </p>
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className='h-5 w-5 text-main-accent'
                        iconName='CheckIcon'
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4',
                          active && 'bg-main-sidebar-background'
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
                               [filter:drop-shadow(#cfd9de_1px_-1px_1px)] 
                               dark:[filter:drop-shadow(#333639_1px_-1px_1px)]'
                  >
                    <CustomIcon
                      className='h-4 w-6 fill-main-background'
                      iconName='TriangleIcon'
                    />
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
