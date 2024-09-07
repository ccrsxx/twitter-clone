import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { limit, orderBy, query } from 'firebase/firestore';
import { formatNumber } from '@lib/date';
import { preventBubbling } from '@lib/utils';
import { trendsCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { Error } from '@components/ui/error';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { Loading } from '@components/ui/loading';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTrendsProps = {
  inTrendsPage?: boolean;
};

export function AsideTrends({ inTrendsPage }: AsideTrendsProps): JSX.Element {
  const { data, loading } = useCollection(
    query(
      trendsCollection,
      orderBy('counter', 'desc'),
      ...(inTrendsPage ? [] : [limit(3)])
    ),
    { allowNull: true, includeUser: true }
  );

  return (
    <section
      className={cn(
        !inTrendsPage &&
          'hover-animation rounded-md border border-gray-200 bg-white shadow-md dark:border-main-background dark:bg-zinc-900'
      )}
    >
      {loading ? (
        <Loading />
      ) : data ? (
        <motion.div
          className={cn('inner:px-4 inner:py-3', inTrendsPage && 'mt-0.5')}
          {...variants}
        >
          {!inTrendsPage && (
            <h2 className='text-xl font-extrabold'>Tendências para você</h2>
          )}
          {data.map(({ text, counter, user: { name } }) => (
            <Link href={''} key={text}>
              <span
                className='hover-animation accent-tab hover-card relative 
                           flex  flex-col gap-0.5 px-4'
                onClick={preventBubbling()}
              >
                <div className='absolute right-2 top-2'>
                  <Button
                    className='hover-animation group relative  p-2
                               hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 
                               focus-visible:!ring-accent-blue/80'
                    onClick={preventBubbling()}
                  >
                    <HeroIcon
                      className='h-5 w-5 text-light-secondary group-hover:text-accent-blue 
                                 group-focus-visible:text-accent-blue dark:text-dark-secondary'
                      iconName='EllipsisHorizontalIcon'
                    />
                    <ToolTip tip='More' />
                  </Button>
                </div>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Tendências
                </p>
                <p className='font-bold'>{text}</p>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Criada por {name}
                </p>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  {formatNumber(counter + 1)} fofocas
                </p>
              </span>
            </Link>
          ))}
          {!inTrendsPage && (
            <Link href='/trends'>
              <span
                className='custom-button accent-tab hover-card block w-full rounded-2xl
                           rounded-t-none text-center text-main-accent'
              >
                Mostrar mais
              </span>
            </Link>
          )}
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
