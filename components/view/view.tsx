import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { statusesCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { Status } from '@components/status/status';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewStatus } from './view-status';

type ViewProps = {
  statusId: string;
};

export function View({ statusId }: ViewProps): JSX.Element {
  const { user } = useAuth();

  const { data: statusData, loading: postLoading } = useDocument(
    doc(statusesCollection, statusId),
    { includeUser: true }
  );

  const { data: repliesData, loading: commentsLoading } = useCollection(
    query(
      statusesCollection,
      where('parent.id', '==', statusId),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  if (postLoading) return <Loading className='mt-5' />;
  if (!statusData)
    return (
      <>
        <SEO title='Tweet not found / Twitter' />
        <Error message='Tweet not found' />
      </>
    );

  const { text, images } = statusData;
  const imagesLength = images?.length ?? 0;

  const pageTitle = statusData
    ? `${user?.username as string} on Twitter: "${text ? `${text} ` : ''}${
        images ? `(${imagesLength} image${imagesLength > 1 ? 's' : ''})` : ''
      }" / Twitter`
    : null;

  return (
    <section>
      {pageTitle && <SEO title={pageTitle} />}
      <ViewStatus {...statusData} />
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
    </section>
  );
}
