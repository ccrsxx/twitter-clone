import { Dialog } from '@headlessui/react';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';

type LogOutModalProps = {
  signOut: () => void;
  closeModal: () => void;
};

export function LogOutModal({
  signOut,
  closeModal
}: LogOutModalProps): JSX.Element {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <i className='mx-auto'>
          <CustomIcon className='h-10 w-10' iconName='TwitterIcon' />
        </i>
        <div className='flex flex-col gap-2'>
          <Dialog.Title className='text-xl font-bold'>
            Log out of Twitter?
          </Dialog.Title>
          <Dialog.Description>
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
          </Dialog.Description>
        </div>
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <Button
          className='bg-follow-button-background text-follow-text-color
                     hover:bg-follow-button-background/90 
                     active:bg-follow-button-background/75'
          onClick={signOut}
        >
          Log out
        </Button>
        <Button
          className='border border-border-color hover:bg-primary/10 
                     active:bg-primary/20'
          onClick={closeModal}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
