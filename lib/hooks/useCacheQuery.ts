import { useRef, useEffect } from 'react';
import { queryEqual } from 'firebase/firestore';
import type { MutableRefObject } from 'react';
import type { Query } from 'firebase/firestore';

export function useCacheQuery<T>(query: Query<T>): MutableRefObject<Query<T>> {
  const cachedQuery = useRef(query);

  useEffect(() => {
    if (!queryEqual(query, cachedQuery.current)) cachedQuery.current = query;
  }, [query]);

  return cachedQuery;
}
