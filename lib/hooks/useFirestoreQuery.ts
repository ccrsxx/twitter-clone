import { useState, useEffect } from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { useCacheQuery } from './useCacheQuery';
import type { Query } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type FirestoreQuery<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};

type DataWithRef<T> = (T & { createdBy: string })[];
type DataWithUser<T> = FirestoreQuery<T & { user: User }>;

export function useFirestoreQuery<T>(
  query: Query<T>,
  options: { includeUser: true }
): DataWithUser<T>;

export function useFirestoreQuery<T>(
  query: Query<T>,
  options?: { includeUser: false }
): FirestoreQuery<T>;

export function useFirestoreQuery<T>(
  query: Query<T>,
  options?: { includeUser?: boolean }
): FirestoreQuery<T> | DataWithUser<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cachedQuery = useCacheQuery(query);

  useEffect(() => {
    const { includeUser } = options ?? {};

    const populateUser = async (currentData: DataWithRef<T>): Promise<void> => {
      const dataWithUser = await Promise.all(
        currentData.map(async (currentData) => {
          const user = (
            await getDoc(doc(usersCollection, currentData.createdBy))
          ).data();
          return { ...currentData, user };
        })
      );
      setData(dataWithUser);
      setLoading(false);
    };

    const unsubscribe = onSnapshot(
      cachedQuery.current,
      (snapshot) => {
        const data = snapshot.docs.map((doc) =>
          doc.data({ serverTimestamps: 'estimate' })
        );
        if (includeUser) void populateUser(data as DataWithRef<T>);
        else {
          setData(data);
          setLoading(false);
        }
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
