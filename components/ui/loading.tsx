import cn from 'clsx';
import { CustomIcon } from './custom-icon';
import type { RefObject } from 'react';

type LoadingProps = {
  ref?: RefObject<HTMLElement>;
  className?: string;
  iconClassName?: string;
};

export function Loading({
  ref,
  className,
  iconClassName
}: LoadingProps): JSX.Element {
  return (
    <i className={cn('flex justify-center', className ?? 'p-4')} ref={ref}>
      <CustomIcon
        className={cn('text-main-accent', iconClassName ?? 'h-7 w-7')}
        iconName='SpinnerIcon'
      />
    </i>
  );
}
