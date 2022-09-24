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
import { variants } from './post-actions';

type PostShareProps = {
  userId: string;
  postId: string;
  viewPost?: boolean;
};

export function PostShare({
  userId,
  postId,
  viewPost
}: PostShareProps): JSX.Element {
  const { userBookmarks } = useAuth();

  const handleBookmark =
    (callback: () => void, ...args: Parameters<typeof manageBookmark>) =>
    async (): Promise<void> => {
      const [type] = args;

      callback();
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

  const handleCopy = (callback: () => void) => async (): Promise<void> => {
    callback();
    await navigator.clipboard.writeText(
      `https://twitter-clone-ccrsxx.vercel.app/post/${postId}`
    );
    toast.success('Copied to clipboard');
  };

  const isBookmarked = !!userBookmarks?.some(({ id }) => id === postId);

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            className='group relative flex items-center gap-1 p-0 outline-none transition-none
                       transition hover:text-accent-blue-secondary'
          >
            <i
              className='relative rounded-full p-2 not-italic duration-200
                         group-hover:bg-accent-blue-secondary/10
                         group-focus-visible:ring-2
                         group-focus-visible:ring-white
                         group-active:bg-accent-blue-secondary/20'
            >
              <HeroIcon
                className={viewPost ? 'h-6 w-6' : 'h-5 w-5'}
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
                  className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
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
                      handleBookmark(close, 'bookmark', userId, postId)
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
                      handleBookmark(close, 'unbookmark', userId, postId)
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
