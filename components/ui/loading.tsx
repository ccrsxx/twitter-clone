import cn from 'clsx';
import { CustomIcon } from './custom-icon';

type LoadingProps = {
  className?: string;
};

export function Loading({ className }: LoadingProps): JSX.Element {
  return (
    <i className={cn('flex justify-center p-4', className)}>
      <CustomIcon className='h-7 w-7 text-accent-blue' iconName='SpinnerIcon' />
    </i>
  );
}
