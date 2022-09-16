import { useState, useEffect, useRef } from 'react';
import { onSnapshot, queryEqual } from 'firebase/firestore';
import type { Query } from 'firebase/firestore';

type FirestoreQuery<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};

export function useFirestoreQuery<T>(query: Query<T>): FirestoreQuery<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cachedQuery = useRef(query);

  useEffect(() => {
    if (!queryEqual(query, cachedQuery.current)) cachedQuery.current = query;
  }, [query]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      cachedQuery.current,
      (snapshot) => {
        const data = snapshot.docs.map((doc) =>
          doc.data({ serverTimestamps: 'estimate' })
        );
        setData(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedQuery.current]);

  return { data, loading, error };
}
