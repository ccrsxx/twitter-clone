import { motion } from 'framer-motion';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { fromTop } from '@components/input/input-form';
import type { ReactNode } from 'react';

type TweetStatusProps = {
  type: 'pin' | 'tweet';
  children: ReactNode;
};

export function TweetStatus({ type, children }: TweetStatusProps): JSX.Element {
  return (
    <motion.div
      className='col-span-2 grid grid-cols-[48px,1fr] gap-3 text-secondary'
      {...fromTop}
    >
      <i className='justify-self-end'>
        {type === 'pin' ? (
          <CustomIcon
            className='h-5 w-5 -rotate-45 fill-secondary'
            iconName='PinIcon'
          />
        ) : (
          <HeroIcon className='h-5 w-5' iconName='ArrowPathRoundedSquareIcon' />
        )}
      </i>
      {children}
    </motion.div>
  );
}
