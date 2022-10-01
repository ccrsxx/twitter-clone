import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { manageReply, removePost } from '@lib/firebase/utils';
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

type StatusActionsProps = {
  isOwner: boolean;
  parentId?: string;
  statusId: string;
  username: string;
};

// TODO: fix bugs on hover, use popover for now instead of menu
// ! There's a workaround for this bug, but it's not ideal, you can prevent bubbling
// ! by putting the modal component outside of this component, like in the status.tsx modal

export function StatusActions({
  isOwner,
  parentId,
  statusId,
  username
}: StatusActionsProps): JSX.Element {
  const { isAdmin } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const isInAdminControl = isAdmin && !isOwner;

  const handleClose = async (): Promise<void> => {
    await Promise.all([
      removePost(statusId),
      parentId && manageReply('decrement', parentId)
    ]);
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
                  {isAuthorized && (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-b-none p-4 text-accent-red
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
