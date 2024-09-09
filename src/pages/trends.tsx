import { useRouter } from 'next/router';
import Link from 'next/link';
import { orderBy, query } from 'firebase/firestore';
import { preventBubbling } from '@lib/utils';
import { trendsCollection } from '@lib/firebase/collections';
import { formatNumber } from '@lib/date';
import { useCollection } from '@lib/hooks/useCollection';
import {
  TrendsLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ReactElement, ReactNode } from 'react';

export default function Bookmarks(): JSX.Element {
  const { back } = useRouter();
  const { data } = useCollection(
    query(
      trendsCollection,
      orderBy('counter', 'desc'),
      ...([])
    ),
    { allowNull: true, includeUser: true }
  );

  return (
    <MainContainer>
      <SEO title='Trends / Twitter' />
      <MainHeader useActionButton title='Trends' action={back}>
        <Button
          className='dark-bg-tab group relative ml-auto cursor-not-allowed p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='Cog8ToothIcon' />
          <ToolTip tip='Settings' />
        </Button>
      </MainHeader>
      <div className='mx-4 space-y-6'>
        {data && data.map(({ text, counter, user: { name } }) => (
          <Link href={''} key={text} className='accent-tab relative px-4 py-3 block duration-200 bg-white hover:shadow-md dark:bg-zinc-900 rounded-md border dark:border-main-background'>
            <span
              className='flex  flex-col gap-0.5'
              onClick={preventBubbling()}
            >
              <div className='absolute right-2 top-2 hidden'>
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
                Trending
              </p>
              <p className='font-bold'>{text}</p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                Created by {name}
              </p>
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                {`${formatNumber(counter + 1)} tweet${counter === 0 ? '' : 's'}`}
              </p>
            </span>
          </Link>
        ))}
        {/* <AsideTrends inTrendsPage /> */}
      </div>
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
