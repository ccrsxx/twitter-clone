import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Button } from '@components/ui/button';
import { Modal } from '@components/modal/modal';
import { MobileSidebarModal } from '@components/modal/mobile-sidebar-modal';
import { UserAvatar } from '@components/user/user-avatar';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';

const variant: Variants = {
  initial: { x: '-100%', opacity: 0.8 },
  animate: {
    x: -8,
    opacity: 1,
    transition: { type: 'spring', duration: 0.8 }
  },
  exit: { x: '-100%', opacity: 0.8, transition: { duration: 0.4 } }
};

export function MobileSidebar(): JSX.Element {
  const { user } = useAuth();

  const { photoURL, name } = user as User;

  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <Modal
        className='p-0'
        modalAnimation={variant}
        modalClassName='pl-2 min-h-screen pb-4 w-72 bg-main-background'
        open={open}
        closeModal={closeModal}
      >
        <MobileSidebarModal {...(user as User)} closeModal={closeModal} />
      </Modal>
      <Button className='accent-tab p-0 xs:hidden' onClick={openModal}>
        <UserAvatar src={photoURL} alt={name} size={30} />
      </Button>
    </>
  );
}
