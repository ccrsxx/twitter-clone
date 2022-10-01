import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/hero-icon';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  useActionButton?: boolean;
  action?: () => void;
};

// TODO: Fix backdrop filter on the header inside stats modal
// ! make it behave like header on the homepage

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  useActionButton,
  action
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 bg-black/60 px-4 py-2 backdrop-blur-md',
        className ?? 'flex items-center gap-6'
      )}
    >
      {useActionButton && (
        <Button
          className='group relative p-2 hover:bg-primary/10 active:bg-primary/20'
          onClick={action}
        >
          <HeroIcon
            className='h-5 w-5'
            iconName={iconName ?? 'ArrowLeftIcon'}
          />
          <ToolTip tip={tip ?? 'Back'} />
        </Button>
      )}
      {title && <h2 className='text-xl font-bold'>{title}</h2>}
      {children}
    </header>
  );
}
