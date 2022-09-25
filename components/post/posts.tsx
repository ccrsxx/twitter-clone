import { AnimatePresence } from 'framer-motion';
import { query, orderBy } from 'firebase/firestore';
import { postsCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { Error } from '@components/ui/error';
import { Loading } from '@components/ui/loading';
import { Article } from './article';

export function Posts(): JSX.Element {
  // error can be used
  const { data, loading } = useCollection(
    query(postsCollection, orderBy('createdAt', 'desc')),
    { includeUser: true }
  );

  if (loading) return <Loading className='mx-auto mt-5' />;
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
