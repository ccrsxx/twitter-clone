import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useModal } from '@lib/hooks/useModal';
import { removePost } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -25, transition: { duration: 0.2 } }
};

type PostActionsProps = {
  postId: string;
  isAdmin: boolean;
  isOwner: boolean;
  username: string;
};

// TODO: fix bugs on hover, use popover for now instead of menu

export function PostActions({
  postId,
  isAdmin,
  isOwner,
  username
}: PostActionsProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const isInAdminControl = isAdmin && !isOwner;

  const handleClose = async (): Promise<void> => {
    await removePost(postId);
    toast.success(
      `${isInAdminControl ? `@${username}'s` : 'Your'} Tweet was deleted`
    );

    closeModal();
  };

  const isAuthorized = isAdmin || isOwner;

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
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
          action={handleClose}
          closeModal={closeModal}
        />
      </Modal>
      <Popover>
        {({ open, close }): JSX.Element => (
          <>
            <Popover.Button
              as={Button}
              className={cn(
                `group absolute top-2 right-2 p-2 
                 hover:bg-accent-blue-secondary/10
                 active:bg-accent-blue-secondary/20`,
                open &&
                  'bg-accent-blue-secondary/10 [&>div>svg]:text-accent-blue-secondary'
              )}
            >
              <div className='group relative'>
                <HeroIcon
                  className='h-5 w-5 text-secondary group-hover:text-accent-blue-secondary'
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
                  {isAuthorized && (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 text-accent-red
                                 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(openModal)}
                    >
                      <HeroIcon iconName='TrashIcon' />
                      Delete
                    </Popover.Button>
                  )}
                  {isOwner ? (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(close)}
                    >
                      <CustomIcon iconName='PinIcon' />
                      Pin to your profile
                    </Popover.Button>
                  ) : (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(close)}
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
