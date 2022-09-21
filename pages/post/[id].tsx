import { useRouter } from 'next/router';
import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { Header } from '@components/home/header';
import type { ReactElement, ReactNode } from 'react';

export default function Post(): JSX.Element {
  const router = useRouter();

  const { id } = router.query;

  return (
    <main className='flex min-h-screen w-full max-w-xl flex-col border-x border-border-color'>
      <Header>
        <h2>Tweet with id: {id}</h2>
      </Header>
    </main>
  );
}

Post.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
