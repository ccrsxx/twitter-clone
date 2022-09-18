import cn from 'clsx';
import { CustomIcon } from './custom-icon';
import type { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
};

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = isLoading ?? disabled;

  return (
    <button
      className={cn('custom-button smooth-tab', className)}
      type='button'
      disabled={isDisabled}
      {...rest}
    >
      {isLoading && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <CustomIcon iconName='SpinnerIcon' />
        </div>
      )}
      {children}
    </button>
  );
}
