import { AnimatePresence } from 'framer-motion';
import { query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { tweetsCollection } from '@lib/firebase/collections';
import {
  MainLayout,
  HomeLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { UpdateUsername } from '@components/home/update-username';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const { data, loading } = useCollection(
    query(
      tweetsCollection,
      where('parent', '==', null),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  return (
    <MainContainer>
      <SEO title='Home / Twitter' />
      <MainHeader className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Home</h2>
        <Button
          className='group relative cursor-not-allowed p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                     dark:active:bg-dark-primary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
          <ToolTip tip='Top tweets' />
        </Button>
      </MainHeader>
      <Input />
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <AnimatePresence mode='popLayout'>
            {data.map((tweet) => (
              <Tweet {...tweet} key={tweet.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
      <UpdateUsername />
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
