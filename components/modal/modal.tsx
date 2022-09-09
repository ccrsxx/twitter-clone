import { Dialog } from '@headlessui/react';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

export function Modal({ open, closeModal }: ModalProps): JSX.Element {
  return (
    <Dialog
      className='fixed top-1/2 left-1/2 z-10 max-w-md -translate-y-1/2 -translate-x-1/2
                 rounded-xl bg-accent-blue p-4 text-primary'
      open={open}
      onClose={closeModal}
    >
      <Dialog.Panel className='flex flex-col gap-2'>
        <Dialog.Title className='text-xl font-bold'>
          Deactivate account
        </Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>
        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
        <div className='flex gap-2 inner:rounded inner:px-2 inner:py-1 inner:font-bold'>
          <button className='bg-red-400' onClick={closeModal}>
            Deactivate
          </button>
          <button className='bg-green-400' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
