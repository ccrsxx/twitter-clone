import { useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import {
  removeTweet,
  manageReply,
  manageFollow,
  managePinnedTweet,
  manageTotalTweets,
  manageTotalPhotos
} from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type { Variants } from 'framer-motion';
import type { Tweet } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

export const variants: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -25, transition: { duration: 0.2 } }
};

type TweetActionsProps = Pick<Tweet, 'createdBy'> & {
  isOwner: boolean;
  tweetId: string;
  username: string;
  parentId?: string;
  hasImages: boolean;
};

// TODO: fix bugs on hover, use popover for now instead of menu
// ! There's a workaround for this bug, but it's not ideal, you can prevent bubbling
// ! by putting the modal component outside of this component, like in the tweet.tsx modal

export function TweetActions({
  isOwner,
  tweetId,
  parentId,
  username,
  hasImages,
  createdBy
}: TweetActionsProps): JSX.Element {
  const { user, isAdmin } = useAuth();

  const {
    open: removeOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal
  } = useModal();

  const {
    open: pinOpen,
    openModal: pinOpenModal,
    closeModal: pinCloseModal
  } = useModal();

  const { id: userId, following, pinnedTweet } = user as User;

  const isInAdminControl = isAdmin && !isOwner;
  const tweetIsPinned = pinnedTweet === tweetId;

  const handleRemove = async (): Promise<void> => {
    await Promise.all([
      removeTweet(tweetId),
      manageTotalTweets('decrement', userId),
      hasImages && manageTotalPhotos('decrement', createdBy),
      parentId && manageReply('decrement', parentId)
    ]);
    toast.success(
      `${isInAdminControl ? `@${username}'s` : 'Your'} Tweet was deleted`
    );
    removeCloseModal();
  };

  const handlePin = async (): Promise<void> => {
    await managePinnedTweet(tweetIsPinned ? 'unpin' : 'pin', userId, tweetId);
    toast.success(
      `Your tweet was ${tweetIsPinned ? 'unpinned' : 'pinned'} to your profile`
    );
    pinCloseModal();
  };

  const handleFollow =
    (closeMenu: () => void, ...args: Parameters<typeof manageFollow>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageFollow(...args);

      toast.success(
        `You ${type === 'follow' ? 'followed' : 'unfollowed'} @${username}`
      );
    };

  const userIsFollowed = following.includes(createdBy);

  const pinModalData = useMemo(
    () =>
      tweetIsPinned
        ? ({
            title: 'Unpin Tweet from profile?',
            description:
              'This will no longer appear automatically at the top of your profile.',
            mainBtnLabel: 'Unpin'
          } as const)
        : ({
            title: 'Pin Tweet to from profile?',
            description:
              'This will appear at the top of your profile and replace any previously pinned Tweet.',
            mainBtnLabel: 'Pin'
          } as const),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pinOpen]
  );

  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-black w-full p-8 rounded-2xl'
        open={removeOpen}
        closeModal={removeCloseModal}
      >
        <ActionModal
          title='Delete Tweet?'
          description={`This can’t be undone and it will be removed from ${
            isInAdminControl ? `${username}'s` : 'your'
          } profile, the timeline of any accounts that follow ${
            isInAdminControl ? `@${username}` : 'you'
          }, and from Twitter search results.`}
          mainBtnLabel='Delete'
          focusOnMainBtn
          action={handleRemove}
          closeModal={removeCloseModal}
        />
      </Modal>
      <Modal
        modalClassName='max-w-xs bg-black w-full p-8 rounded-2xl'
        open={pinOpen}
        closeModal={pinCloseModal}
      >
        <ActionModal
          {...pinModalData}
          mainBtnClassName='bg-follow-button-background text-follow-text-color
                            hover:bg-follow-button-background/90 
                            active:bg-follow-button-background/75'
          focusOnMainBtn
          action={handlePin}
          closeModal={pinCloseModal}
        />
      </Modal>
      <Popover>
        {({ open, close }): JSX.Element => (
          <>
            <Popover.Button
              as={Button}
              className={cn(
                `group absolute top-2 right-2 p-2 
                 hover:bg-accent-blue/10
                 active:bg-accent-blue/20`,
                open && 'bg-accent-blue/10 [&>div>svg]:text-accent-blue'
              )}
            >
              <div className='group relative'>
                <HeroIcon
                  className='h-5 w-5 text-secondary group-hover:text-accent-blue'
                  iconName='EllipsisHorizontalIcon'
                />
                {!open && <ToolTip tip='More' />}
              </div>
            </Popover.Button>
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  className='group absolute top-[50px] right-2 z-40 w-full max-w-xs rounded-md bg-black text-primary 
                             outline-none [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                  as={motion.div}
                  {...variants}
                  static
                >
                  {(isAdmin || isOwner) && (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-b-none p-4 text-accent-red
                                 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(removeOpenModal)}
                    >
                      <HeroIcon iconName='TrashIcon' />
                      Delete
                    </Popover.Button>
                  )}
                  {isOwner ? (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(pinOpenModal)}
                    >
                      {tweetIsPinned ? (
                        <>
                          <CustomIcon iconName='PinOffIcon' />
                          Unpin from profile
                        </>
                      ) : (
                        <>
                          <CustomIcon iconName='PinIcon' />
                          Pin to your profile
                        </>
                      )}
                    </Popover.Button>
                  ) : userIsFollowed ? (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'unfollow', userId, createdBy)
                      )}
                    >
                      <HeroIcon iconName='UserMinusIcon' />
                      Unfollow @{username}
                    </Popover.Button>
                  ) : (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'follow', userId, createdBy)
                      )}
                    >
                      <HeroIcon iconName='UserPlusIcon' />
                      Follow @{username}
                    </Popover.Button>
                  )}
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </>
  );
}
