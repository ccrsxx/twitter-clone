import { useState, useEffect, useMemo } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import type { CollectionReference } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type UserArrayDocument<T> = {
  data: T[] | null;
  loading: boolean;
};

type DataWithRef<T> = (T & { createdBy: string })[];
type DataWithUser<T> = UserArrayDocument<T & { user: User }>;

export function useArrayDocument<T>(
  docsIds: string[],
  collectionRef: CollectionReference<T>,
  options?: { includeUser?: true; disabled?: boolean }
): DataWithUser<T>;

export function useArrayDocument<T>(
  docsIds: string[],
  collectionRef: CollectionReference<T>,
  options?: { includeUser?: false; disabled?: boolean }
): UserArrayDocument<T>;

export function useArrayDocument<T>(
  docsId: string[],
  collection: CollectionReference<T>,
  options?: { includeUser?: boolean; disabled?: boolean }
): UserArrayDocument<T> | DataWithUser<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const cachedDocsId = useMemo(() => docsId, [docsId]);

  const { includeUser, disabled } = options ?? {};

  useEffect(() => {
    if (disabled) return;

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

    const fetchData = async (): Promise<void> => {
      try {
        const docsSnapshot = await Promise.all(
          cachedDocsId.map((id) => getDoc(doc(collection, id)))
        );

        const docs = docsSnapshot.map((doc) =>
          doc.data({ serverTimestamps: 'estimate' })
        );

        if (!docs.length) {
          setData(null);
          setLoading(false);
          return;
        }

        if (includeUser) void populateUser(docs as DataWithRef<T>);
        else {
          setData(docs as T[]);
          setLoading(false);
        }
      } catch {
        setData(null);
        setLoading(false);
      }
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedDocsId]);

  return { data, loading };
}
