import cn from 'clsx';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { preventBubbling } from '@lib/utils';
import { siteURL } from '@lib/env';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from '@components/tweet/tweet-actions';

type UserShareProps = {
  username: string;
};

export function UserShare({ username }: UserShareProps): JSX.Element {
  const handleCopy = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();
    await navigator.clipboard.writeText(`${siteURL}/user/${username}`);
    toast.success('Copied to clipboard');
  };

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            className={cn(
              `custom-button smooth-tab group relative border border-light-line-reply p-2
               hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
               dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
              open && 'bg-light-primary/10 dark:bg-dark-primary/10'
            )}
          >
            <HeroIcon className='h-5 w-5' iconName='EllipsisHorizontalIcon' />
            {!open && <ToolTip tip='More' />}
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                className='menu-container group absolute right-0 top-11 w-max text-light-primary dark:text-dark-primary'
                as={motion.div}
                {...variants}
                static
              >
                <Popover.Button
                  className='flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                  as={Button}
                  onClick={preventBubbling(handleCopy(close))}
                >
                  <HeroIcon iconName='LinkIcon' />
                  Copy link to Profile
                </Popover.Button>
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
