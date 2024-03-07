import { Dialog } from '@headlessui/react';
import { Button } from '@components/ui/button';
import type { ReactNode, FormEvent } from 'react';

type LocationModalProps = {
  loading: boolean;
  children: ReactNode;
  onSetLocation: (e: FormEvent<HTMLFormElement>) => void;
  removeSetLocation: () => void;
};

export function LocationModal({
  loading,
  children,
  onSetLocation,
  removeSetLocation
}: LocationModalProps): JSX.Element {
  return (
    <form
      className='flex h-full flex-col justify-between'
      onSubmit={onSetLocation}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-row gap-4'>
          <Dialog.Title className='text-2xl font-bold xs:text-3xl sm:text-4xl'>
            Tag location
          </Dialog.Title>
          <div className='ml-auto flex flex-row gap-4'>
            <Button
              className='dark-bg-tab self-start border border-light-line-reply px-4 py-1.5 font-bold
            hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
            dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
              onClick={removeSetLocation}
            >
              Remove
            </Button>
            <Button
              className='custom-button accent-tab accent-bg-tab self-start border border-light-line-reply 
              px-4 py-1.5 font-bold text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20 
              dark:border-light-secondary dark:hover:bg-main-accent/10 dark:active:bg-main-accent/20'
              type='submit'
              loading={loading}
            >
              Done
            </Button>
          </div>
        </div>
        {children}
      </div>
    </form>
  );
}
