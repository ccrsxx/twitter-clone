import { useState, useEffect } from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { useCacheRef } from './useCacheRef';
import type { DocumentReference } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type UseDocument<T> = {
  data: T | null;
  loading: boolean;
};

type DataWithRef<T> = T & { createdBy: string };
type DataWithUser<T> = UseDocument<T & { user: User }>;

export function useDocument<T>(
  docRef: DocumentReference<T>,
  options: { includeUser: true; allowNull?: boolean }
): DataWithUser<T>;

export function useDocument<T>(
  docRef: DocumentReference<T>,
  options?: { includeUser?: false; allowNull?: boolean }
): UseDocument<T>;

export function useDocument<T>(
  docRef: DocumentReference<T>,
  options?: { includeUser?: boolean; allowNull?: boolean }
): UseDocument<T> | DataWithUser<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const cachedDocRef = useCacheRef(docRef);

  useEffect(() => {
    setData(null);
    setLoading(true);

    const populateUser = async (currentData: DataWithRef<T>): Promise<void> => {
      const userData = await getDoc(
        doc(usersCollection, currentData.createdBy)
      );
      const dataWithUser = { ...currentData, user: userData.data() };

      setData(dataWithUser);
      setLoading(false);
    };

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data({ serverTimestamps: 'estimate' });

      if (options?.allowNull && !data) {
        setData(null);
        setLoading(false);
        return;
      }

      if (options?.includeUser) void populateUser(data as DataWithRef<T>);
      else {
        setData(data as T);
        setLoading(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedDocRef]);

  return { data, loading };
}
