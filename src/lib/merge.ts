import type { Timestamp } from 'firebase/firestore';

type DataWithDate<T> = T & { createdAt: Timestamp };

export function mergeData<T>(
  sortData: boolean,
  ...tweets: (DataWithDate<T>[] | null)[]
): DataWithDate<T>[] | null {
  const validData = tweets.filter((tweet) => tweet) as DataWithDate<T>[][];
  const mergeData = validData.reduce((acc, tweet) => [...acc, ...tweet], []);

  return mergeData.length
    ? sortData
      ? mergeData.sort((a, b) => +b.createdAt.toDate() - +a.createdAt.toDate())
      : mergeData
    : null;
}
