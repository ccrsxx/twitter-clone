import { AnimatePresence } from 'framer-motion';
import { query, where, orderBy } from 'firebase/firestore';
import { statusesCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { Error } from '@components/ui/error';
import { Loading } from '@components/ui/loading';
import { Article } from './article';

export function Statuses(): JSX.Element {
  const { data, loading } = useCollection(
    query(
      statusesCollection,
      where('parent', '==', null),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true }
  );

  if (loading) return <Loading className='mt-5' />;
  if (!data) return <Error message='Something went wrong' />;

  return (
    <section>
      <AnimatePresence mode='popLayout'>
        {data?.map((post) => (
          <Article {...post} key={post.id} />
        ))}
      </AnimatePresence>
    </section>
  );
}
