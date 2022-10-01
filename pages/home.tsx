import { AnimatePresence } from 'framer-motion';
import { query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { statusesCollection } from '@lib/firebase/collections';
import { ProtectedRoute, HomeLayout, Layout } from '@components/common/layout';
import { SEO } from '@components/common/seo';
import { Tweet } from '@components/tweet/tweet';
import { NewUsername } from '@components/home/new-username';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { MainHeader } from '@components/home/main-header';
import { Status } from '@components/status/status';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const { data, loading } = useCollection(
    query(
      statusesCollection,
      where('parent', '==', null),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  return (
    <main className='flex min-h-screen w-full max-w-xl flex-col border-x border-border-color'>
      <SEO title='Home / Twitter' />
      <MainHeader className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Home</h2>
        <Button className='group relative p-2 hover:bg-primary/10 active:bg-primary/20'>
          <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
          <ToolTip tip='Top tweets' />
        </Button>
      </MainHeader>
      <Tweet />
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <AnimatePresence mode='popLayout'>
            {data?.map((post) => (
              <Status {...post} key={post.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
      <NewUsername />
    </main>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
