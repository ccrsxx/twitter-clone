import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { IconName } from '@components/ui/hero-icon';

const options: [string, IconName][] = [
  ['Settings and privacy', 'Cog8ToothIcon'],
  ['Help Center', 'QuestionMarkCircleIcon'],
  ['Display', 'PaintBrushIcon']
];

export function More(): JSX.Element {
  return (
    <Menu className='relative' as='div'>
      {({ open }): JSX.Element => (
        <>
          <div className='group relative flex py-1'>
            <Menu.Button
              className='custom-button smooth-tab flex gap-4 pr-5 
                         text-xl group-hover:bg-primary/10'
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
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', duration: 0.4 }
                }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
                static
              >
                {options.map(([name, iconName]) => (
                  <Menu.Item key={name}>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'gap-3 flex w-full rounded p-4 duration-200',
                          active && 'bg-sidebar-background'
                        )}
                      >
                        <HeroIcon iconName={iconName} />
                        {name}
                      </Button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}
