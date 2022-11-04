import { Dialog } from '@headlessui/react';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import type { ReactNode, FormEvent } from 'react';

type UsernameModalProps = {
  loading: boolean;
  children: ReactNode;
  available: boolean;
  alreadySet: boolean;
  changeUsername: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelUpdateUsername: () => void;
};

const usernameModalData = [
  {
    title: 'What should we call you?',
    description: 'Your @username is unique. You can always change it later.',
    cancelLabel: 'Skip'
  },
  {
    title: 'Change your username?',
    description:
      'Your @username is unique. You can always change it here again.',
    cancelLabel: 'Cancel'
  }
] as const;

export function UsernameModal({
  loading,
  children,
  available,
  alreadySet,
  changeUsername,
  cancelUpdateUsername
}: UsernameModalProps): JSX.Element {
  const { title, description, cancelLabel } = usernameModalData[+alreadySet];

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
            <Dialog.Title className='text-4xl font-bold'>{title}</Dialog.Title>
            <Dialog.Description className='text-light-secondary dark:text-dark-secondary'>
              {description}
            </Dialog.Description>
          </div>
        </div>
        {children}
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <Button
          className='bg-light-primary text-white transition focus-visible:bg-light-primary/90
                     enabled:hover:bg-light-primary/90 enabled:active:bg-light-primary/80 
                     dark:bg-light-border dark:text-light-primary dark:focus-visible:bg-light-border/90 
                     dark:enabled:hover:bg-light-border/90 dark:enabled:active:bg-light-border/75'
          type='submit'
          loading={loading}
          disabled={!available}
        >
          Set username
        </Button>
        <Button
          className='border border-light-line-reply hover:bg-light-primary/10 focus-visible:bg-light-primary/10
                     active:bg-light-primary/20 dark:border-light-secondary dark:text-light-border 
                     dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 
                     dark:active:bg-light-border/20'
          onClick={cancelUpdateUsername}
        >
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}
