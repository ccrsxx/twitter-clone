import cn from 'clsx';
import { HeroIcon } from './hero-icon';
import type { ReactNode } from 'react';

type VerifiedNameProps = {
  verified: boolean;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
};

export function VerifiedName({
  verified,
  children,
  className,
  iconClassName
}: VerifiedNameProps): JSX.Element {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
      {verified && (
        <i>
          <HeroIcon
            className={iconClassName ?? 'h-5 w-5'}
            iconName='CheckBadgeIcon'
            solid
          />
        </i>
      )}
    </div>
  );
}
