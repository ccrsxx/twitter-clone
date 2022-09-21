import { ProtectedRoute, HomeLayout, Layout } from '@components/common/layout';
import { SEO } from '@components/common/seo';
import { Posts } from '@components/posts/posts';
import { Tweet } from '@components/tweet/tweet';
import { NewUsername } from '@components/home/new-username';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { Header } from '@components/home/header';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  return (
    <main className='flex min-h-screen w-full max-w-xl flex-col border-x border-border-color'>
      <SEO title='Home / Twitter' />
      <Header>
        <h2 className='text-xl font-bold'>Home</h2>
        <Button className='group relative p-2 hover:bg-primary/10 active:bg-primary/20'>
          <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
          <ToolTip tip='Top tweets' />
        </Button>
      </Header>
      <Tweet />
      <Posts />
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
