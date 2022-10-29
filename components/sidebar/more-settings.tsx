import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { DisplayModal } from '@components/modal/display-modal';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { MenuLink } from './menu-link';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
};

export function MoreSettings(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <Modal
        modalClassName='max-w-xl bg-main-background w-full p-8 rounded-2xl hover-animation'
        open={open}
        closeModal={closeModal}
      >
        <DisplayModal closeModal={closeModal} />
      </Modal>
      <Menu className='relative' as='div'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button className='group relative flex w-full py-1 outline-none'>
              <div
                className={cn(
                  `custom-button flex gap-4 pr-5 text-xl transition group-hover:bg-light-primary/10
                   group-focus-visible:ring-2 group-focus-visible:ring-white dark:group-hover:bg-dark-primary/10`,
                  open && 'bg-light-primary/10 dark:bg-dark-primary/10'
                )}
              >
                <HeroIcon
                  className='h-7 w-7'
                  iconName='EllipsisHorizontalCircleIcon'
                />{' '}
                More
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute -top-44 w-11/12 font-medium'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          'flex w-full gap-3 rounded-t-md p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        href='/settings'
                      >
                        <HeroIcon iconName='Cog8ToothIcon' />
                        Settings and privacy
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <a
                        className={cn(
                          'flex w-full gap-3 rounded-none p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        href='https://support.twitter.com'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <HeroIcon iconName='QuestionMarkCircleIcon' />
                        Help center
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-none rounded-b-md p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='PaintBrushIcon' />
                        Display
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
