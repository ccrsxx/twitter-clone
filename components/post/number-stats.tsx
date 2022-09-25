import { AnimatePresence, motion } from 'framer-motion';
import { getAnimationMove } from '@lib/utils';
import { formatNumber } from '@lib/format';

type NumberStatsProps = {
  move: number;
  stats: number;
};

export function NumberStats({ move, stats }: NumberStatsProps): JSX.Element {
  return (
    <div className='overflow-hidden'>
      <AnimatePresence mode='wait'>
        {!!stats && (
          <motion.p className='text-sm' {...getAnimationMove(move)} key={stats}>
            {formatNumber(stats)}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
