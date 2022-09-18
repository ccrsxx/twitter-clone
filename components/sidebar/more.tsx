import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
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

export function More(): JSX.Element {
  return (
    <Menu className='relative' as='div'>
      {({ open }): JSX.Element => (
        <>
          <div className='group relative flex py-1'>
            <Menu.Button
              className={cn(
                'custom-button smooth-tab flex gap-4 pr-5',
                'text-xl group-hover:bg-primary/10',
                open && 'bg-primary/10'
              )}
            >
              <HeroIcon
                className='h-7 w-7'
                iconName='EllipsisHorizontalCircleIcon'
              />{' '}
              More
            </Menu.Button>
          </div>
          <AnimatePresence>
            {open && (
              <Menu.Items
                className='absolute -top-44 w-11/12 rounded-md bg-black outline-none
                           [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                as={motion.div}
                {...variants}
                static
              >
                <Menu.Item>
                  {({ active }): JSX.Element => (
                    <MenuLink
                      className={cn(
                        'flex w-full gap-3 rounded p-4 duration-200',
                        active && 'bg-sidebar-background'
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
                      href='https://support.twitter.com'
                      className={cn(
                        'flex w-full gap-3 rounded p-4 duration-200',
                        active && 'bg-sidebar-background'
                      )}
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
                        'flex w-full gap-3 rounded p-4 duration-200',
                        active && 'bg-sidebar-background'
                      )}
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
  );
}
