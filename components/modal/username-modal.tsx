import { Dialog } from '@headlessui/react';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import type { ReactNode, FormEvent } from 'react';

type UsernameModalProps = {
  children: ReactNode;
  available: boolean;
  changeUsername: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelUpdateUsername: () => void;
};

export function UsernameModal({
  children,
  available,
  changeUsername,
  cancelUpdateUsername
}: UsernameModalProps): JSX.Element {
  return (
    <form
      className='flex h-full flex-col justify-between'
      onSubmit={changeUsername}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <i className='mx-auto'>
            <CustomIcon className='h-10 w-10' iconName='TwitterIcon' />
          </i>
          <div className='flex flex-col gap-2'>
            <Dialog.Title className='text-4xl font-bold'>
              What should we call you?
            </Dialog.Title>
            <Dialog.Description className='text-secondary'>
              Your @username is unique. You can always change it later.
            </Dialog.Description>
          </div>
        </div>
        {children}
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <Button
          className='bg-follow-button-background text-follow-text-color transition hover:bg-follow-button-background/90 
                     active:bg-follow-button-background/75 disabled:brightness-50'
          type='submit'
          disabled={!available}
        >
          Set username
        </Button>
        <Button
          className='border border-border-color hover:bg-primary/10  active:bg-primary/20'
          onClick={cancelUpdateUsername}
        >
          Skip
        </Button>
      </div>
    </form>
  );
}
