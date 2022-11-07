/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { query, where, orderBy, limit } from 'firebase/firestore';
import cn from 'clsx';
import { useCollection } from '@lib/hooks/useCollection';
import { getHomeTweetsCount } from '@lib/firebase/utils';
import { tweetsCollection } from '@lib/firebase/collections';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { UpdateUsername } from '@components/home/update-username';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const [tweetsLimit, setTweetsLimit] = useState(10);
  const [tweetsSize, setTweetsSize] = useState<number | null>(null);
  const [reachedLimit, setReachedLimit] = useState(false);
  const [loadMoreInView, setLoadMoreInView] = useState(false);

  const { data, loading } = useCollection(
    query(
      tweetsCollection,
      ...[
        where('parent', '==', null),
        orderBy('createdAt', 'desc'),
        ...(!reachedLimit ? [limit(tweetsLimit)] : [])
      ]
    ),
    { includeUser: true, allowNull: true, preserve: true }
  );

  useEffect(() => {
    const checkLimit = tweetsSize ? tweetsLimit >= tweetsSize : false;
    setReachedLimit(checkLimit);
  }, [tweetsSize, tweetsLimit]);

  useEffect(() => {
    if (reachedLimit) return;

    const setTweetsLength = async (): Promise<void> => {
      const currentTweetsSize = await getHomeTweetsCount();
      setTweetsSize(currentTweetsSize);
    };

    void setTweetsLength();
  }, [data]);

  useEffect(() => {
    if (reachedLimit) return;
    if (loadMoreInView) setTweetsLimit(tweetsLimit + 10);
  }, [loadMoreInView]);

  const makeItInView = (): void => setLoadMoreInView(true);
  const makeItNotInView = (): void => setLoadMoreInView(false);

  const isLoadMoreHidden =
    reachedLimit && (data?.length ?? 0) >= (tweetsSize ?? 0);

  return (
    <MainContainer>
      <SEO title='Home / Twitter' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        <UpdateUsername />
      </MainHeader>
      <Input />
      <section className='mt-0.5 xs:mt-0'>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            <motion.div
              className={cn(
                'mb-20 xs:mb-0',
                isLoadMoreHidden ? 'hidden' : 'block'
              )}
              viewport={{ margin: '0px 0px 1500px' }}
              onViewportEnter={makeItInView}
              onViewportLeave={makeItNotInView}
            >
              <Loading className='m-5' />
            </motion.div>
          </>
        )}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
