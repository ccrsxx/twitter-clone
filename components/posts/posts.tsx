import { useEffect } from 'react';
import { query, orderBy } from 'firebase/firestore';
import { convertDate } from '@lib/date';
import { postsCollection } from '@lib/firebase/collections';
import { useFirestoreQuery } from '@lib/hooks/useFirestoreQuery';
import { Loading } from '@components/ui/loading';

export function Posts(): JSX.Element {
  const { data, loading, error } = useFirestoreQuery(
    query(postsCollection, orderBy('createdAt', 'desc'))
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <Loading className='mx-auto mt-4' />;

  return (
    <div className='flex flex-col gap-2 px-4 py-2'>
      {data.map(({ id, text, createdAt }) => (
        <div key={id}>
          <p>{text}</p>
          <p>{convertDate(createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
