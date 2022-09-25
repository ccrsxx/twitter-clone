import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatNumber } from '@lib/format';
import { preventBubbling } from '@lib/utils';
import { useTrends } from '@lib/api/trends';
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

export function AsideTrends(): JSX.Element {
  // error can be used
  const { data, loading } = useTrends(23424846, 10, {
    refreshInterval: 30000
  });

  const { trends, location } = data ?? {};

  return (
    <section className='rounded-2xl bg-sidebar-background'>
      {loading ? (
        <Loading />
      ) : trends && location ? (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-extrabold'>Trends for you</h2>
          {trends.map(({ name, query, tweet_volume, url }) => (
            <Link href={url} key={query}>
              <a
                className='hover-animation smooth-tab relative flex flex-col 
                           gap-0.5 hover:bg-white/[0.03]'
              >
                <div className='absolute right-2 top-2'>
                  <Button
                    className='hover-animation group relative p-2 hover:bg-accent-blue/10
                               active:bg-accent-blue/20'
                    onClick={preventBubbling()}
                  >
                    <HeroIcon
                      className='h-5 w-5 text-secondary group-hover:text-accent-blue'
                      iconName='EllipsisHorizontalIcon'
                    />
                    <ToolTip tip='More' />
                  </Button>
                </div>
                <p className='text-sm text-secondary'>
                  Trending{' '}
                  {location === 'Worldwide' ? 'Worldwide' : `in ${location}`}
                </p>
                <p className='font-bold'>{name}</p>
                <p className='text-sm text-secondary'>
                  {formatNumber(tweet_volume)} tweets
                </p>
              </a>
            </Link>
          ))}
          <Link href='/trends'>
            <a
              className='custom-button smooth-tab block w-full rounded-2xl rounded-t-none
                         text-center text-accent-blue hover:bg-white/[0.03]'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
