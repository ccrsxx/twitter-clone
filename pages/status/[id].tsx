import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { statusesCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { MainHeader } from '@components/home/main-header';
import { Status } from '@components/status/status';
import { ViewStatus } from '@components/view/view-status';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewParentTweet } from '@components/view/view-parent-tweet';
import type { ReactElement, ReactNode } from 'react';

export default function StatusId(): JSX.Element {
  const {
    query: { id },
    back
  } = useRouter();

  const { user } = useAuth();

  const { data: statusData, loading: postLoading } = useDocument(
    doc(statusesCollection, id as string),
    { includeUser: true, allowNull: true }
  );

  const { data: repliesData, loading: commentsLoading } = useCollection(
    query(
      statusesCollection,
      where('parent.id', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  const { text, images } = statusData ?? {};

  const imagesLength = images?.length ?? 0;
  const parentId = statusData?.parent?.id;

  const pageTitle = statusData
    ? `${user?.username as string} on Twitter: "${text ? `${text} ` : ''}${
        images ? `(${imagesLength} image${imagesLength > 1 ? 's' : ''})` : ''
      }" / Twitter`
    : null;

  return (
    <main
      className='flex min-h-screen w-full max-w-xl flex-col
                 border-x border-border-color pb-[448px]'
    >
      <MainHeader
        useActionButton
        title={parentId ? 'Thread' : 'Tweet'}
        action={back}
      />
      <section>
        {postLoading ? (
          <Loading className='mt-5' />
        ) : !statusData ? (
          <>
            <SEO title='Tweet not found / Twitter' />
            <Error message='Tweet not found' />
          </>
        ) : (
          <>
            {pageTitle && <SEO title={pageTitle} />}
            {parentId && <ViewParentTweet parentId={parentId} />}
            <ViewStatus reply={!!statusData.parent} {...statusData} />
            {statusData &&
              (commentsLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map((comment) => (
                    <Status reply {...comment} key={comment.id} />
                  ))}
                </AnimatePresence>
              ))}
          </>
        )}
      </section>
    </main>
  );
}

StatusId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
