import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import type { IconName } from '@components/ui/hero-icon';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  action?: () => void;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  disableSticky,
  useActionButton,
  action
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'z-10 bg-black/60 px-4 py-2 backdrop-blur-md',
        !disableSticky && 'sticky top-0',
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
      <AnimatePresence mode='popLayout'>
        {title && (
          <motion.h2 className='text-xl font-bold' {...variants} key={title}>
            {title}
          </motion.h2>
        )}
        {children}
      </AnimatePresence>
    </header>
  );
}
