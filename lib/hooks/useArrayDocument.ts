import { useState, useEffect, useMemo } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import type { CollectionReference } from 'firebase/firestore';

type UserArrayDocument<T> = {
  data: T[] | null;
  loading: boolean;
};

export function useArrayDocument<T>(
  docsId: string[] | null,
  collection: CollectionReference<T>
): UserArrayDocument<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const cachedDocsId = useMemo(() => docsId, [docsId]);

  useEffect(() => {
    if (!cachedDocsId) {
      setLoading(true);
      return;
    }

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

        setData(docs as T[]);
        setLoading(false);
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
