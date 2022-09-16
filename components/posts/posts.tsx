import { postsCollection } from '@lib/firebase/firestore-ref';
import { useFirestoreQuery } from '@lib/hooks/useFirestoreQuery';
import { Loading } from '@components/ui/loading';

export function Posts(): JSX.Element {
  const { data, loading, error } = useFirestoreQuery(postsCollection);

  if (loading) return <Loading className='mx-auto mt-4' />;

  return (
    <div className='flex flex-col gap-2'>
      
    </div>
  );
}
