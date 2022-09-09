import { useModal } from '@lib/hooks/useModal';
import { ProtectedRoute, HomeLayout, Layout } from '@components/common/layout';
import { SEO } from '@components/common/seo';
import { Tweet } from '@components/tweet/tweet';
import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { Tooltips } from '@components/ui/tooltips';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  return (
    <main className='flex min-h-screen w-full max-w-xl flex-col border-x border-border-color'>
      <SEO
        title='Home / Twitter'
        description='Twitter is the best place to see what’s happening in the world. Follow your interests to get unfiltered news, live updates, and the latest trends.'
        image='/home.png'
      />
      <div
        className='sticky top-0 z-10 flex items-center justify-between
                   bg-black/60 px-4 py-2 backdrop-blur-md'
      >
        <h2 className='text-xl font-bold'>Home</h2>
        <Button
          className='group relative p-2 hover:bg-primary/10 active:bg-primary/20'
          onClick={openModal}
        >
          <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
          <Tooltips tips='Top tweets' />
        </Button>
      </div>
      <Tweet />
      <Modal open={open} closeModal={closeModal} />
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
