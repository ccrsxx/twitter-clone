import cn from 'clsx';
import { CustomIcon } from './custom-icon';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className,
  iconClassName
}: LoadingProps): JSX.Element {
  return (
    <i className={className ?? 'flex justify-center p-4'}>
      <CustomIcon
        className={cn('text-accent-blue', iconClassName ?? 'h-7 w-7')}
        iconName='SpinnerIcon'
      />
    </i>
  );
}
