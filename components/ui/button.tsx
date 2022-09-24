import { forwardRef } from 'react';
import cn from 'clsx';
import { CustomIcon } from './custom-icon';
import type { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
};

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, disabled, children, ...rest }, ref) => {
    const isDisabled = isLoading ?? disabled;

    return (
      <button
        className={cn('custom-button smooth-tab', className)}
        type='button'
        disabled={isDisabled}
        ref={ref}
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
);
