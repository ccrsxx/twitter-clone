import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatNumber } from '@lib/format';
import { useTrends } from '@lib/api/trends';
import { Error } from '@components/ui/error';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { Tooltips } from '@components/ui/tooltips';
import { Loading } from '@components/ui/loading';

export function Trending(): JSX.Element {
  const { data, isLoading, isError } = useTrends(23424846, 10, {
    refreshInterval: 10000
  });

  const { trends, location } = data ?? {};

  return (
    <section className='rounded-2xl bg-sidebar-background'>
      {isLoading ? (
        <Loading />
      ) : trends && location ? (
        <motion.div
          className='inner:px-4 inner:py-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-xl font-extrabold'>Trends for you</h2>
          {trends.map(({ name, query, tweet_volume, url }) => (
            <Link href={url} key={query}>
              <a
                className='hover-animation smooth-tab relative flex flex-col 
                           gap-0.5 hover:bg-sidebar-hover-color'
              >
                <div className='absolute right-2 top-2'>
                  <Button className='hover-animation group relative p-2 hover:bg-accent-blue-secondary/10'>
                    <HeroIcon
                      className='h-5 w-5 text-secondary group-hover:text-accent-blue-secondary'
                      iconName='EllipsisHorizontalIcon'
                    />
                    <Tooltips tips='More' />
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
          <Button
            className='w-full rounded-2xl rounded-t-none text-center
                       text-accent-blue-secondary hover:bg-sidebar-hover-color'
          >
            Show more
          </Button>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
