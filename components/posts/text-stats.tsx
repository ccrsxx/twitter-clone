import { AnimatePresence, motion } from 'framer-motion';
import { getAnimationMove } from '@lib/utils';

type TextStatsProps = {
  move: number;
  stats: number;
};

export function TextStats({ move, stats }: TextStatsProps): JSX.Element {
  return (
    <div className='overflow-hidden'>
      <AnimatePresence mode='wait'>
        {!!stats && (
          <motion.p className='text-sm' {...getAnimationMove(move)} key={stats}>
            {stats}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
