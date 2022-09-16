import { Dialog } from '@headlessui/react';
import cn from 'clsx';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import type { FormEvent, ChangeEvent } from 'react';

type UsernameModalProps = {
  available: boolean;
  inputValue: string;
  errorMessage: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  changeUsername: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelUpdateUsername: () => void;
};

export function UsernameModal({
  available,
  inputValue,
  errorMessage,
  handleChange,
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
        <div className='flex flex-col gap-3'>
          <div className='relative flex flex-col gap-1'>
            <input
              className={cn(
                'peer w-full rounded border border-border-color bg-inherit',
                'px-3 pb-2 pt-5 placeholder-transparent outline-none transition',
                errorMessage
                  ? 'border-input-error-color focus:ring-1 focus:ring-input-error-color'
                  : 'focus:border-accent-blue-secondary'
              )}
              id='username'
              type='text'
              placeholder='Username'
              onChange={handleChange}
              value={inputValue}
            />
            <label
              className={cn(
                'absolute left-3 translate-y-1 text-sm',
                'text-secondary transition-all',
                'peer-placeholder-shown:translate-y-3',
                'peer-placeholder-shown:text-lg',
                'peer-focus:translate-y-1',
                'peer-focus:text-sm',
                errorMessage
                  ? 'text-input-error-color peer-focus:text-input-error-color'
                  : 'peer-focus:text-accent-blue-secondary'
              )}
              htmlFor='username'
            >
              Username
            </label>
            {errorMessage && (
              <p className='text-sm text-input-error-color'>{errorMessage}</p>
            )}
          </div>
        </div>
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
          className='border border-border-color hover:bg-primary/10 
                       active:bg-primary/20'
          onClick={cancelUpdateUsername}
        >
          Skip
        </Button>
      </div>
    </form>
  );
}
