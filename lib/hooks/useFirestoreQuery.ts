import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setData(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [query]);

  return { data, loading, error };
}
