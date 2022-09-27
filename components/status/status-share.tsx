import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { manageBookmark } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from './status-actions';

type StatusShareProps = {
  userId: string;
  statusId: string;
  viewStatus?: boolean;
};

export function StatusShare({
  userId,
  statusId,
  viewStatus
}: StatusShareProps): JSX.Element {
  const { userBookmarks } = useAuth();

  const handleBookmark =
    (closeMenu: () => void, ...args: Parameters<typeof manageBookmark>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageBookmark(...args);

      toast.success(
        type === 'bookmark'
          ? (): JSX.Element => (
              <span className='flex gap-2'>
                Tweet added to your Bookmarks
                <Link href='/bookmarks'>
                  <a className='custom-underline font-bold'>View</a>
                </Link>
              </span>
            )
          : 'Tweet removed from your bookmarks'
      );
    };

  const handleCopy = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();
    await navigator.clipboard.writeText(
      `https://twitter-clone-ccrsxx.vercel.app/status/${statusId}`
    );
    toast.success('Copied to clipboard');
  };

  const isBookmarked = !!userBookmarks?.some(({ id }) => id === statusId);

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            className='group relative flex items-center gap-1 p-0 outline-none transition-none
                       transition hover:text-accent-blue'
          >
            <i
              className='relative rounded-full p-2 not-italic duration-200
                         group-hover:bg-accent-blue/10
                         group-focus-visible:ring-2
                         group-focus-visible:ring-white
                         group-active:bg-accent-blue/20'
            >
              <HeroIcon
                className={viewStatus ? 'h-6 w-6' : 'h-5 w-5'}
                iconName='ArrowUpTrayIcon'
              />
              {!open && <ToolTip tip='Share' />}
            </i>
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                className='group absolute right-0 top-11 z-40 w-max rounded-md bg-black text-primary
                           outline-none [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                as={motion.div}
                {...variants}
                static
              >
                <Popover.Button
                  className='flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-sidebar-background'
                  as={Button}
                  onClick={preventBubbling(handleCopy(close))}
                >
                  <HeroIcon iconName='LinkIcon' />
                  Copy link to Tweet
                </Popover.Button>
                {!isBookmarked ? (
                  <Popover.Button
                    className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'bookmark', userId, statusId)
                    )}
                  >
                    <HeroIcon iconName='BookmarkIcon' />
                    Bookmark
                  </Popover.Button>
                ) : (
                  <Popover.Button
                    className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'unbookmark', userId, statusId)
                    )}
                  >
                    <HeroIcon iconName='BookmarkSlashIcon' />
                    Remove Tweet from Bookmarks
                  </Popover.Button>
                )}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
