import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from '@lib/hooks/useModal';
import { removePost } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import type { Variants } from 'framer-motion';

const variants: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } }
};

type ActionsProps = {
  postId: string;
  isAdmin: boolean;
  isOwner: boolean;
};

export function Actions({
  postId,
  isAdmin,
  isOwner
}: ActionsProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const handleClose = async (): Promise<void> => {
    await removePost(postId);
    closeModal();
  };

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title='Delete Tweet?'
          description='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.'
          mainBtnLabel='Delete'
          focusOnMainBtn
          action={handleClose}
          closeModal={closeModal}
        />
      </Modal>
      <Menu>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                `hover-animation custom-button smooth-tab group absolute top-2
                 right-2 p-2 hover:bg-accent-blue-secondary/10
                 active:bg-accent-blue-secondary/20`,
                open &&
                  'bg-accent-blue-secondary/10 [&>div>svg]:text-accent-blue-secondary'
              )}
            >
              <div className='group-relative'>
                <HeroIcon
                  className='h-5 w-5 text-secondary group-hover:text-accent-blue-secondary'
                  iconName='EllipsisHorizontalIcon'
                />
                <ToolTip tip='More' />
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='absolute top-12 right-2 z-40 w-full max-w-xs rounded-md bg-black text-primary 
                             outline-none [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4 text-accent-red',
                          active && 'bg-sidebar-background'
                        )}
                        onClick={preventBubbling(openModal)}
                      >
                        <HeroIcon iconName='TrashIcon' />
                        Delete
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
