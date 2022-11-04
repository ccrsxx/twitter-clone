import { useRef, useEffect } from 'react';
import cn from 'clsx';
import { Dialog } from '@headlessui/react';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';

type ActionModalProps = {
  title: string;
  useIcon?: boolean;
  description: string;
  mainBtnLabel: string;
  focusOnMainBtn?: boolean;
  mainBtnClassName?: string;
  secondaryBtnLabel?: string;
  secondaryBtnClassName?: string;
  action: () => void;
  closeModal: () => void;
};

export function ActionModal({
  title,
  useIcon,
  description,
  mainBtnLabel,
  focusOnMainBtn,
  mainBtnClassName,
  secondaryBtnLabel,
  secondaryBtnClassName,
  action,
  closeModal
}: ActionModalProps): JSX.Element {
  const mainBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!focusOnMainBtn) return;
    const timeoutId = setTimeout(() => mainBtn.current?.focus(), 50);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        {useIcon && (
          <i className='mx-auto'>
            <CustomIcon
              className='h-10 w-10 text-accent-blue dark:text-twitter-icon'
              iconName='TwitterIcon'
            />
          </i>
        )}
        <div className='flex flex-col gap-2'>
          <Dialog.Title className='text-xl font-bold'>{title}</Dialog.Title>
          <Dialog.Description className='text-light-secondary dark:text-dark-secondary'>
            {description}
          </Dialog.Description>
        </div>
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <button
          className={cn(
            'custom-button main-tab text-white',
            mainBtnClassName ??
              `bg-light-primary hover:bg-light-primary/90 focus-visible:bg-light-primary/90 active:bg-light-primary/80
               dark:bg-light-border dark:text-light-primary dark:hover:bg-light-border/90
               dark:focus-visible:bg-light-border/90 dark:active:bg-light-border/75`
          )}
          ref={mainBtn}
          onClick={action}
        >
          {mainBtnLabel}
        </button>
        <Button
          className={cn(
            'border border-light-line-reply dark:border-light-secondary dark:text-light-border',
            secondaryBtnClassName ??
              `hover:bg-light-primary/10 focus-visible:bg-light-primary/10 active:bg-light-primary/20
               dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 dark:active:bg-light-border/20`
          )}
          onClick={closeModal}
        >
          {secondaryBtnLabel ?? 'Cancel'}
        </Button>
      </div>
    </div>
  );
}
